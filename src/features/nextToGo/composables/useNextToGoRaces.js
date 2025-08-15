import { nextToGo as API } from "../apis/api.nextToGo";
import { onMounted, reactive, computed, watch } from "vue";
import { RACING_CATEGORIES } from "../../../consts/consts.racingCategories";

export function useNextToGoRaces() {
    const RACE_COUNT_THRESHOLD = 5;
    const AVAILABLE_FILTERS = Object.values(RACING_CATEGORIES);

    const state = reactive({
        isLoading: false,
        raceSummaries: [],
        selectedFilters: [],
    });

    onMounted(getNextRaces);

    const availableRaces = computed(() => state.raceSummaries.slice(0, RACE_COUNT_THRESHOLD));

    /**
     * Asynchronously fetches the next n races (default is 10) and updates the state with the race summaries.
     * Sets the loading state before and after the API call.
     * @returns {Promise<void>} Resolves when the race summaries have been fetched and state updated.
     */
    async function getNextRaces() {
        state.isLoading = true;
        try {
            const { data } = await API.getNextRaces();
            const { race_summaries } = data;
            state.raceSummaries = Object.values(race_summaries);
        } finally {
            state.isLoading = false;
        }
    }

    /**
     * Removes a race from the races list by its race_id.
     * @param {string|number} raceId - The unique identifier of the race to remove.
     */
    function removeRace(raceId) {
        state.raceSummaries = state.raceSummaries.filter(({ race_id }) => race_id !== raceId);
    }

    // Once our list of races drops below threshold, fetch new list from API.
    watch(
        () => availableRaces.value.length,
        (len) => {
            if (len < RACE_COUNT_THRESHOLD) getNextRaces();
        }
    );

    return {
        AVAILABLE_FILTERS,
        availableRaces,
        removeRace,
        state,
    };
}

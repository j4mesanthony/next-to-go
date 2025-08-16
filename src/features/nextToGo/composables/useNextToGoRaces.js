import { nextToGo as API } from "../apis/api.nextToGo";
import { onMounted, reactive, computed, watch, toRefs } from "vue";
import { RACING_CATEGORIES_LIST } from "../../../consts/consts.racingCategories";

export function useNextToGoRaces() {
    const RACE_COUNT_THRESHOLD = 5;

    const state = reactive({
        isLoading: false,
        raceSummaries: [],
        selectedFilters: [],
    });

    onMounted(getNextRaces);

    /**
     * Only includes races whose advertised start time is no more than 60 seconds in the past.
     * @returns {Array<Object>} List of race summaries
     */
    const availableRaces = computed(() => {
        const _byLessThanMinuteOld = ({ advertised_start }) => {
            const { seconds } = advertised_start;
            const startTime = new Date(seconds * 1000);
            const diffInSeconds = Math.floor((startTime - Date.now()) / 1000);
            return diffInSeconds >= -60;
        };

        return state.raceSummaries.filter(_byLessThanMinuteOld);
    });

    /**
     * Fetches the next n races (default is 10) and updates the state with the race summaries.
     * Sets the loading state before and after the API call.
     * @returns {Promise<void>} Resolves when the race summaries have been fetched and state updated.
     */
    async function getNextRaces() {
        state.isLoading = true;
        try {
            const { data } = await API.getNextRaces();
            const { race_summaries } = data;
            // Populate raceSummaries with new races from API resonse.
            const existingIds = state.raceSummaries.map(({ race_id }) => race_id);
            const newRaces = Object.values(race_summaries).filter((x) => !existingIds.includes(x.race_id));
            state.raceSummaries = [...state.raceSummaries, ...newRaces];
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

    const { isLoading, selectedFilters } = toRefs(state);

    return {
        RACING_CATEGORIES_LIST,
        RACE_COUNT_THRESHOLD,
        availableRaces,
        isLoading,
        removeRace,
        selectedFilters,
    };
}

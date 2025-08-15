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

    onMounted(getRaces);

    const availableRaces = computed(() => state.raceSummaries.slice(0, RACE_COUNT_THRESHOLD));

    async function getRaces() {
        state.isLoading = true;
        try {
            const { data } = await API.getNextNRaces();
            const { race_summaries } = data;
            state.raceSummaries = Object.values(race_summaries);
        } finally {
            state.isLoading = false;
        }
    }

    function removeRace(raceId) {
        state.raceSummaries = state.raceSummaries.filter(({ race_id }) => race_id !== raceId);
    }

    watch(
        () => availableRaces.value.length,
        (len) => {
            if (len < RACE_COUNT_THRESHOLD) getRaces();
        }
    );

    return {
        AVAILABLE_FILTERS,
        availableRaces,
        removeRace,
        state,
    };
}

<script setup>
    import { computed } from "vue";
    import { RACING_CATEGORIES_LIST } from "../../../consts/consts.racingCategories";
    import { useSecondTimer } from "../../../composables/useSecondTimer";

    const emit = defineEmits(["remove"]);

    const props = defineProps({
        // List of race data to display. Defaults to an empty array.
        data: {
            type: Array,
            default: () => [],
        },

        // Maximum numer of items in list
        max: {
            type: Number,
            required: true,
        },

        // List of category IDs to filter races. Defaults to an empty array.
        categoryIds: {
            type: Array,
            default: () => [],
        },
    });

    const { currentTime } = useSecondTimer();

    /**
     * Computes a filtered and formatted list of upcoming races.
     * - Filters out races that started more than 60 seconds ago or are not in the allowed categories.
     * - Sorts the races by their advertised start time in ascending order.
     * @returns {Array<Object>} List of upcoming races with relevant details for presentation.
     */
    const raceListComputed = computed(() => {
        // id/name object categories for quick look-up when building out raceList.
        const categories = RACING_CATEGORIES_LIST.reduce((acc, n) => {
            acc[n.id] = n.name;
            return acc;
        }, {});

        const list = props.data
            // Only show relevant categories
            .filter(({ category_id }) => props.categoryIds.includes(category_id))
            // Sort races by start time ASCENDING
            .sort((a, b) => a.advertised_start.seconds - b.advertised_start.seconds)
            // Pull out the data we need to present and include formatted startTime to be used in getTimeDiff call.
            .map((x) => {
                const seconds = x.advertised_start.seconds;
                const startTime = new Date(seconds * 1000);

                return {
                    race_id: x.race_id,
                    meeting_name: x.meeting_name,
                    race_number: x.race_number,
                    category: categories[x.category_id],
                    startTime,
                };
            });

        // Only show up to max amount set in props
        return list.slice(0, props.max);
    });

    /**
     * Calculates the time difference in seconds between the current time and the provided start time.
     * This function is used instead implementing with raceListComputed to avoid triggering a re-render of the
     * entire race list when the timer updates.
     * @param {Date} startTime - The start time of the race, as a Date object.
     * @returns {string} The time difference in seconds between now and the start time formatted as string with minute and/or second data.
     */
    function getTimeDiff(raceId, startTime) {
        const diffInSeconds = Math.floor((startTime - currentTime.value) / 1000);
        if (diffInSeconds <= -60) emit("remove", raceId);
        return diffInSeconds < 60 ? `${diffInSeconds}s` : `${Math.floor(diffInSeconds / 60)}m ${diffInSeconds % 60}s`;
    }
</script>

<template>
    <div className="relative">
        <div
            v-for="race in raceListComputed"
            :key="race.race_id"
            data-test-id="raceItem"
            className="bg-white text-left text-sm p-3 flex flex-row gap-4 justify-between font-semibold mb-1">
            <div className="uppercase" :data-test-id="race.race_id">
                {{ race.meeting_name }} R{{ race.race_number }} ({{ race.category }})
            </div>
            <div className="text-red-700 text-right" :data-test-id="`${race.race_id}-startTime`">
                {{ getTimeDiff(race.race_id, race.startTime) }}
            </div>
        </div>

        <h2 v-if="!raceListComputed.length" data-test-id="noDataMsg" className="absolute top-2 pl-3">No races</h2>
    </div>
</template>

<script setup>
    import { computed } from "vue";
    import { RACING_CATEGORIES } from "../../../consts/consts.racingCategories";
    import { useSecondTimer } from "../../../composables/useSecondTimer";

    const emit = defineEmits(["remove"]);

    const props = defineProps({
        data: {
            type: Array,
            default: () => [],
        },

        categoryIds: {
            type: Array,
            default: () => [],
        },

        isLoading: {
            type: Boolean,
            default: false,
        },
    });

    const { currentTime } = useSecondTimer();

    const raceListComputed = computed(() => {
        // id/name object categories for quick look-up when building out raceList.
        const categories = Object.values(RACING_CATEGORIES).reduce((acc, n) => {
            acc[n.id] = n.name;
            return acc;
        }, {});

        const _byLessThanMinuteOldOfValidCategory = ({ advertised_start, category_id }) => {
            const seconds = advertised_start.seconds;
            const startTime = new Date(seconds * 1000);
            const diffInSeconds = Math.floor((startTime - Date.now()) / 1000);
            return diffInSeconds > -60 && props.categoryIds.includes(category_id);
        };

        const list = props.data
            // We don't want old or irrelevant races
            .filter(_byLessThanMinuteOldOfValidCategory)
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

        return list;
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
    <div className="flex flex-col gap-1 relative">
        <transition-group name="slide-left">
            <div
                v-for="race in raceListComputed"
                :key="race.race_id"
                data-test-id="raceItem"
                className="bg-white text-left text-sm p-3 flex flex-row gap-4 justify-between font-semibold">
                <div className="uppercase" :data-test-id="race.race_id">
                    {{ race.meeting_name }} R{{ race.race_number }} ({{ race.category }})
                </div>
                <div className="text-red-700" :data-test-id="`${race.race_id}-startTime`">
                    {{ getTimeDiff(race.race_id, race.startTime) }}
                </div>
            </div>
        </transition-group>

        <h2
            v-if="!raceListComputed.length && !props.isLoading"
            data-test-id="noDataMsg"
            className="absolute top-2 pl-3">
            No races
        </h2>
        <h2 v-if="props.isLoading" className="absolute top-2 pl-3">Loading data...</h2>
    </div>
</template>

<style scoped>
    .slide-left-leave-active {
        transition: transform 0.4s ease-in-out, opacity 0.4s ease-in-out;
    }

    .slide-left-leave-to {
        transform: translateX(-100%);
        opacity: 0;
    }
</style>

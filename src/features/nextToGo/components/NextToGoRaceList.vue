<script setup>
import { computed, reactive, onMounted, onBeforeUnmount } from "vue";

const emit = defineEmits(['removeNext']);

const props = defineProps({
    data: {
        type: Array,
        default: []
    },

    filters: {
        type: Array,
        default: []
    }
});

const state = reactive({
    now: Date.now()
});

let interval;
onMounted(startTimer);
onBeforeUnmount(() => clearInterval(interval));

function startTimer() {
    interval = setInterval(() => {
        state.now = Date.now();
    }, 1000);
}

const raceList = computed(() => {
    const _byLessThanMinuteOldOfValidCategory = ({ advertised_start, category_id }) => {
        const seconds = advertised_start.seconds;
        const startTime = new Date(seconds * 1000);
        const diffInSeconds = Math.floor((startTime - Date.now()) / 1000);
        return diffInSeconds > -60 && props.filters.includes(category_id);
    }

    const list = props.data
    // We don't want to present any old races on first render.
    .filter(_byLessThanMinuteOldOfValidCategory)
    // Sort races by start time ASCENDING
    .sort((a, b) => a.advertised_start.seconds - b.advertised_start.seconds)
    // TODO: Refactor map and filter into a reducer
    .map(x => {
        const seconds = x.advertised_start.seconds;
        const startTime = new Date(seconds * 1000);

        return { 
            race_id: x.race_id, 
            meeting_name: x.meeting_name, 
            race_number: x.race_number,
            category_id: x.category_id,
            startTime,
        }
    });

    return list;
});

function getTimeDiff(startTime) {
    const diffInSeconds = Math.floor((startTime - state.now) / 1000);
    if (diffInSeconds <= -60) emit("removeNext");

    return diffInSeconds < 60 ? `${diffInSeconds}s` : `${Math.floor(diffInSeconds / 60)}m ${diffInSeconds % 60}s`;
}
</script>

<template>
    <div className="flex flex-col gap-1">
        <transition-group name="slide-left">
            <div v-for="race in raceList" :key="race.race_id" className="bg-white text-left p-4 flex flex-row gap-4 justify-between font-semibold">
                <div className="uppercase">{{ race.meeting_name }} R{{ race.race_number }}</div>
                <div className="text-red-700">{{  getTimeDiff(race.startTime) }}</div>
            </div>
        </transition-group>
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
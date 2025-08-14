<script setup>
import { computed, reactive, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
    data: {
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
    const list = props.data
    // Map data to include start countdown
    .map(x => {
        const seconds = x.advertised_start.seconds;
        const startTime = new Date(seconds * 1000);
        const diffInSeconds = Math.floor((startTime - state.now) / 1000);

        return { 
            id: x.race_id, 
            meeting_name: x.meeting_name, 
            race_number: x.race_number,
            diffInSeconds,
            // Format countdown string to include minutes and seconds (1m 30s)
            start_time_formatted: diffInSeconds < 60 ? `${diffInSeconds}s` : `${Math.floor(diffInSeconds / 60)}m ${diffInSeconds % 60}s`
        }
    })
    // TODO: Refactor map and filter into a reducer
    .filter(({ diffInSeconds }) => diffInSeconds > -60);

    return list;
});
</script>

<template>
    <div v-for="race in raceList" :key="race">
        {{ race.meeting_name }} - #{{ race.race_number }} : {{  race.start_time_formatted }}
    </div>
</template>
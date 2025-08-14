<script setup>
import { onMounted, reactive, computed } from 'vue';
import { nextToGo as API } from './apis/api.nextToGo';
import NextToGoRaceList from './components/NextToGoRaceList.vue';

const state = reactive({
    raceSummaries: [],
});

onMounted(getRaces);

async function getRaces() {
    const { data } = await API.getNextNRaces(5);
    const { race_summaries } = data;

    state.raceSummaries = Object.values(race_summaries)
    // Sort races by start time ASCENDING
    .sort((a, b) => a.advertised_start.seconds - b.advertised_start.seconds);
}
</script>

<template>
    
    <div>
        <!-- TODO: CategoryFilter -->

        <h1>Next To Go</h1>
        <NextToGoRaceList :data="state.raceSummaries" />
    </div>
</template>
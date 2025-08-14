<script setup>
import { onMounted, reactive } from 'vue';
import { nextToGo as API } from './apis/api.nextToGo';
import NextToGoRaceList from './components/NextToGoRaceList.vue';

const state = reactive({
    raceSummaries: {},
});

onMounted(getRaces);

async function getRaces() {
    const { data } = await API.getNextNRaces();
    const { race_summaries } = data;
    state.raceSummaries = race_summaries;
}
</script>

<template>
    
    <div>
        <!-- TODO: CategoryFilter -->

        <h1>Next To Go</h1>
        <NextToGoRaceList :data="state.raceSummaries" />
    </div>
</template>
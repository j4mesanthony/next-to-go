<script setup>
import { nextToGo as API } from './apis/api.nextToGo';
import { onMounted, reactive, computed } from 'vue';
import FilterOptions from "../../components/FilterOptions.vue";
import NextToGoRaceList from './components/NextToGoRaceList.vue';

const AVAILABLE_FILTERS = [
    { id: '9daef0d7-bf3c-4f50-921d-8e818c60fe61', name: 'Greyhound' }, 
    { id: '161d9be2-e909-4326-8c2c-35ed71fb460b', name: 'Harness' }, 
    { id: '4a2788f8-e825-4d36-9894-efd4baf1cfae', name: 'Horse' }];

const state = reactive({
    raceSummaries: [],
    selectedFilters: ['9daef0d7-bf3c-4f50-921d-8e818c60fe61'],
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
        <div>
            <h1>Next to go racing</h1>
            <FilterOptions v-model="state.selectedFilters" :options="AVAILABLE_FILTERS" />
        </div>

        <NextToGoRaceList :data="state.raceSummaries" :filters="state.selectedFilters" />
    </div>
</template>
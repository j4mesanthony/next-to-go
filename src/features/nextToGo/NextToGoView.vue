<script setup>
import { nextToGo as API } from './apis/api.nextToGo';
import { onMounted, reactive, computed } from 'vue';
import { RACING_CATEGORIES } from '../../consts/consts.racingCategories';
import FilterOptions from "../../components/FilterOptions.vue";
import NextToGoRaceList from './components/NextToGoRaceList.vue';

const { Greyhound } = RACING_CATEGORIES;

const state = reactive({
    raceSummaries: [],
    selectedFilters: [Greyhound.id],
});

const AVAILABLE_FILTERS = Object.values(RACING_CATEGORIES);

onMounted(getRaces);

async function getRaces() {
    const { data } = await API.getNextNRaces(5);
    const { race_summaries } = data;
    state.raceSummaries = Object.values(race_summaries);
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
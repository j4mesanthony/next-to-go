<script setup>
import { nextToGo as API } from './apis/api.nextToGo';
import { onMounted, reactive } from 'vue';
import { RACING_CATEGORIES } from '../../consts/consts.racingCategories';
import FilterOptions from "../../components/FilterOptions.vue";
import NextToGoRaceList from './components/NextToGoRaceList.vue';

const { Horse, Greyhound, Harness } = RACING_CATEGORIES;

const state = reactive({
    raceSummaries: [],
    selectedFilters: [Horse.id, Greyhound.id, Harness.id],
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
    <div className="w-full flex flex-col gap-2">
        <div className="flex flex-row gap-4 items-center grow">
            <h1 className=" bg-gray-800 text-white text-md p-3 font-bold uppercase grow max-w-2/3 text-left">Next to go racing</h1>
            <FilterOptions v-model="state.selectedFilters" :options="AVAILABLE_FILTERS" />
        </div>

        <NextToGoRaceList :data="state.raceSummaries" :filters="state.selectedFilters" @removeNext="state.raceSummaries.shift()" />
    </div>
</template>
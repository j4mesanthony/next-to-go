<script setup>
    import FilterOptions from "../../components/FilterOptions.vue";
    import NextToGoRaceList from "./components/NextToGoRaceList.vue";
    import { useNextToGoRaces } from "./composables/useNextToGoRaces";

    const { RACING_CATEGORIES_LIST, RACE_COUNT_THRESHOLD, availableRaces, isLoading, removeRace, selectedFilters } =
        useNextToGoRaces();
</script>

<template>
    <div className="w-full flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row gap-2 items-center grow">
            <h1
                className="h-12 bg-gray-800 text-white text-md p-3 font-bold uppercase grow w-full sm:max-w-2/3 text-left flex flex-row justify-between">
                {{ isLoading ? "loading..." : "Next to go racing" }}
            </h1>
            <FilterOptions v-model="selectedFilters" :options="RACING_CATEGORIES_LIST" />
        </div>

        <NextToGoRaceList
            :data="availableRaces"
            :max="RACE_COUNT_THRESHOLD"
            :categoryIds="selectedFilters"
            @remove="removeRace" />
    </div>
</template>

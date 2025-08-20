<script setup>
    import NextToGoRaceList from "./components/NextToGoRaceList.vue";
    import { useNextToGoRaces } from "./composables/useNextToGoRaces";

    const { RACING_CATEGORIES_LIST, threshold, availableRaces, isLoading, removeRace, selectedFilters } =
        useNextToGoRaces();
</script>

<template>
    <div className="w-full flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-1 items-center grow">
            <h1
                className="h-12 bg-gray-800 text-white text-md p-3 font-bold uppercase grow w-full sm:max-w-2/3 text-left flex flex-row justify-between">
                Next to go racing
                <LoadingSpinner v-if="isLoading" />
            </h1>
            <FilterOptions v-model="selectedFilters" :options="RACING_CATEGORIES_LIST" />
        </div>

        <NextToGoRaceList :data="availableRaces" :max="threshold" :categoryIds="selectedFilters" @remove="removeRace" />
    </div>
</template>

<script setup>
    import FilterOptions from "../../components/FilterOptions.vue";
    import NextToGoRaceList from "./components/NextToGoRaceList.vue";
    import { useNextToGoRaces } from "./composables/useNextToGoRaces";

    const { AVAILABLE_FILTERS, availableRaces, removeRace, state } = useNextToGoRaces();
</script>

<template>
    <div className="w-full flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row gap-4 items-center grow">
            <h1 className=" bg-gray-800 text-white text-md p-3 font-bold uppercase grow w-full sm:max-w-2/3 text-left">
                Next to go racing
            </h1>
            <FilterOptions v-model="state.selectedFilters" :options="AVAILABLE_FILTERS" />
        </div>

        <NextToGoRaceList
            :data="availableRaces"
            :categoryIds="state.selectedFilters"
            :isLoading="state.isLoading"
            @remove="removeRace" />
    </div>
</template>

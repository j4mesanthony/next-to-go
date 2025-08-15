<script setup>
    import { onMounted } from "vue";

    const emit = defineEmits(["update:modelValue"]);

    const { modelValue, options } = defineProps({
        modelValue: {
            type: Array,
            required: true,
        },

        options: {
            type: Array,
            default: () => [],
        },
    });

    onMounted(setOptionsIfEmptySelection);

    function setOptionsIfEmptySelection() {
        if (!modelValue.length) {
            emit(
                "update:modelValue",
                options.map(({ id }) => id)
            );
        }
    }

    /**
     * Updates the filter state based on the selected filter option.
     * @param {Event} e - The event object triggered by the filter option selection.
     * @param {string} id - The identifier of the selected filter option.
     */
    function setFilters(e, id) {
        if (modelValue.includes(id)) {
            const newFilters = modelValue.filter((x) => x !== id);
            const data = newFilters.length ? newFilters : options.map(({ id }) => id);
            !newFilters.length && e.preventDefault();
            emit("update:modelValue", data);
        } else {
            emit("update:modelValue", [...modelValue, id]);
        }
    }
</script>

<template>
    <div className="flex flex-row justify-between w-full px-3">
        <div v-for="option in options" :key="option.id">
            <label :for="option.name" :data-test-id="option.id">{{ option.name }}</label>
            <input
                :id="option.name"
                :data-test-id="`select-${option.id}`"
                type="checkbox"
                :checked="modelValue.includes(option.id)"
                @click="(e) => setFilters(e, option.id)" />
        </div>
    </div>
</template>

<script setup>
const emit = defineEmits(['update:modelValue']);

const { modelValue, options } = defineProps({
    modelValue: {
        type: Array,
        required: true
    },

    options: {
        type: Array,
        default: []
    }
});

function setFilters(e, id) {
    if (modelValue.includes(id)) {
        const newFilters = modelValue.filter(x => x !== id);
        const data = newFilters.length ? newFilters : options.map(({id}) => id);
        !newFilters.length && e.preventDefault();
        emit('update:modelValue', data);
    }
    else {
        emit('update:modelValue', [...modelValue, id]);
    }    
}
</script>

<template>
    <div v-for="option in options" :key="option.id">    
        <input type="checkbox" :checked="modelValue.includes(option.id)" @click="e => setFilters(e, option.id)">
            {{option.name}}
        </input>
    </div>
</template>
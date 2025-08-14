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

function setFilters(id) {
    // if (modelValue.length === 1 && modelValue[0] === id) {
    //     emit('update:modelValue', options.map(({id}) => id));
    // }
    if (modelValue.includes(id)) {
        emit('update:modelValue', modelValue.filter(x => x !== id));
    }
    else {
        emit('update:modelValue', [...modelValue, id]);
    }    
}
</script>

<template>
    <div v-for="option in options" :key="option.id">    
        <input type="checkbox" :checked="modelValue.includes(option.id)" @click="setFilters(option.id)">
            {{option.name}}
        </input>
    </div>
</template>
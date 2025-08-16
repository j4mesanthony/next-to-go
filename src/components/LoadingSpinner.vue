<script setup>
    const props = defineProps({
        alt: {
            type: String,
            defauilt: "Loading...",
        },
    });
</script>

<template>
    <img src="../assets/spinner.svg" :alt="props.alt" className="animate-spin" />
</template>

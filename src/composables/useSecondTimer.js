import { onMounted, onBeforeUnmount, ref } from "vue";

export function useSecondTimer() {
    const currentTime = ref(Date.now());

    let interval;
    onMounted(startTimer);
    onBeforeUnmount(() => clearInterval(interval));

    function startTimer() {
        interval = setInterval(() => {
            currentTime.value = Date.now();
        }, 1000);
    }

    return {
        currentTime,
    };
}

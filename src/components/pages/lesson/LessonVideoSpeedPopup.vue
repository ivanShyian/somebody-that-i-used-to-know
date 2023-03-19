<template>
  <transition
    class="lesson-video-speed-popup"
    name="fade"
    as="div"
    appear
  >
    <div
      v-if="isTransitionShown"
      class="fade p-10 rounded-full bg-black/50 w-32 h-32 flex items-center justify-center
    absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
    >
      <p class="text-3xl text-white">{{ currentSpeed }}x</p>
    </div>
  </transition>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, ref, toRef, watch } from 'vue';

export default defineComponent({
  props: {
    currentSpeed: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const initialCurrentSpeed = ref(1);
    const timeout = ref<ReturnType<typeof setTimeout> | null>(null);

    const isTransitionShown = computed(() => {
      return initialCurrentSpeed.value !== props.currentSpeed;
    });

    const watcher = watch([isTransitionShown, toRef(props, 'currentSpeed')], ([showTransition, newSpeed]) => {
      if (showTransition) {
        if (timeout.value) clearTimeout(timeout.value)
        timeout.value = setTimeout(() => {
          initialCurrentSpeed.value = newSpeed;
        }, 1000);
      }
    });

    onBeforeUnmount(() => {
      if (timeout.value) clearTimeout(timeout.value);
      watcher()
    })

    return {
      isTransitionShown,
      initialCurrentSpeed,
    }
  },
});
</script>

<style lang="scss">
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>

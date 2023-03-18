<template>
  <div
    class="h-full w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    :class="{ 'hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-150' : isAnimationEnabled }"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    isAnimationEnabled: {
      type: Boolean,
      default: true,
    }
  }
})
</script>

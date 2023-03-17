<template>
  <div class="VImage">
    <!-- @TODO Add required width, height attrs -->
    <img
      v-if="imageError"
      src="@/assets/img/unavailable.jpeg"
      alt="image unavailable"
      class="h-auto max-w-full rounded-lg"
    >
    <img
      v-else
      :src="src"
      :alt="alt"
      class="h-auto max-w-full rounded-lg"
      @error="imageError = true"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: true,
    }
  },
  data: () => ({
    imageError: false,
  }),
});
</script>

<style scoped>

</style>

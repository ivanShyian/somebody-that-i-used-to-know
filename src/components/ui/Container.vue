<template>
  <div
    class="max-w-[1440px] mx-auto px-10 relative h-full w-full laptop:max-w-[1200px] tablet:max-w-[1000px] mobile:max-w-full"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

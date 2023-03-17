<template>
  <div class="default-layout bg-gray-900 min-h-screen h-full w-screen">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DefaultLayout'
})
</script>

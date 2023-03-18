<template>
  <div class="layout-default bg-gray-900 min-h-screen h-full flex flex-col">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LayoutDefault',
})
</script>

<template>
  <div class="layout-default bg-gray-900 min-h-screen h-full flex flex-col">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Breadcrumbs from '@/components/ui/Breadcrumbs.vue';

export default defineComponent({
  name: 'LayoutDefault',
  components: { Breadcrumbs }
})
</script>

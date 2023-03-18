<template>
  <div class="App">
    <component :is="layout">
      <Suspense>
        <router-view :key="route.fullPath" />
      </Suspense>
    </component>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useQueryProvider } from "vue-query";
import { useRoute } from 'vue-router';

import LayoutDefault from '@/layouts/LayoutDefault.vue';

useQueryProvider();

export default defineComponent({
  components: {
    LayoutDefault,
  },
  setup() {
    const route = useRoute();
    const activeLayout = ref('Default');

    const layout = computed(() => {
      return 'Layout' + activeLayout.value;
    });

    //@TODO Add errorCaptured hook to force error layout whenever error captured

    return {
      layout,
      route: route
    }
  }
})
</script>

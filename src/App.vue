<template>
  <div class="App">
    <component :is="layout">
      <Suspense>
        <router-view />
      </Suspense>
    </component>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LayoutDefault from '@/layouts/LayoutDefault.vue';

export default defineComponent({
  components: {
    LayoutDefault,
  },
  data: () => ({
    activeLayout: 'Default',
  }),
  computed: {
    layout() {
      return 'Layout' + this.activeLayout;
    }
  }
})
</script>

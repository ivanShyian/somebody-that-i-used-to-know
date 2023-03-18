<template>
  <div class="flex flex-col flex-1 h-full pb-12">
    <Breadcrumbs :breadcrumbs="breadcrumbs" />
    <Loader
      v-if="isLoading"
      centered
    />

    <ErrorBlock v-else-if="isError" />

    <template v-else>
      <Container class="pt-8">
        <slot />
      </Container>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Loader from '@/components/ui/Loader.vue';
import Breadcrumbs from '@/components/ui/Breadcrumbs/Breadcrumbs.vue';
import Container from '@/components/ui/Container.vue';
import { IBreadcrumbs } from '@/components/ui/Breadcrumbs/types';
import ErrorBlock from '@/components/blocks/ErrorBlock.vue';

export default defineComponent({
  components: {
    ErrorBlock,
    Container,
    Breadcrumbs,
    Loader
  },
  props: {
    isLoading: {
      type: Boolean,
      default: true,
    },
    isError: {
      type: Boolean,
      default: false,
    },
    breadcrumbs: {
      type: Array as PropType<IBreadcrumbs.Item[]>,
      required: false,
      default: () => ([]),
    }
  }
});
</script>

<style scoped>

</style>

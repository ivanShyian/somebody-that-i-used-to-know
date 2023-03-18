<template>
  <nav class="flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700" aria-label="Breadcrumb">
    <Container>
      <ol class="inline-flex items-center space-x-1 md:space-x-3 md:flex-col md:items-start md:w-[250px] md:whitespace-nowrap md:overflow-hidden md:text-ellipsis">
        <li class="inline-flex items-center">
          <component
            :is="path === '/' ? 'span' : 'router-link'"
            to="/"
            class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
            <img
              class="mr-2"
              src="@/assets/icons/grid.svg"
              width="24"
              height="24"
              alt="courses"
            />
            Courses
          </component>
        </li>
        <li
          v-for="(crumb, crumbIndex) in breadcrumbs"
          :key="crumb.title"
          class="md:w-full md:!ml-0"
        >
          <div class="flex items-center">
            <svg
              aria-hidden="true"
              class="w-6 h-6 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            <component
              :is="breadcrumbs.length === crumbIndex + 1  ? 'span' : 'router-link'"
              :to="crumb.to"
              :class="{ 'dark:text-white': breadcrumbs.length === crumbIndex + 1 }"
              class="ml-1 md:text-ellipsis md:overflow-hidden -mb-0.5 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
            >
              {{ crumb.title }}
            </component>
          </div>
        </li>
      </ol>
    </Container>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useRoute } from 'vue-router';
import { IBreadcrumbs } from '@/components/ui/Breadcrumbs/types';

import Container from '@/components/ui/Container.vue';

export default defineComponent({
  components: { Container },
  props: {
    breadcrumbs: {
      type: Array as PropType<IBreadcrumbs.Item[]>,
      required: false,
      default: () => ([]),
    }
  },
  setup() {
    const route = useRoute();

    return {
      path: route.path,
    }
  }
});
</script>

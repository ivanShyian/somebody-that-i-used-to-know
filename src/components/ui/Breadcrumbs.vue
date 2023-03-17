<template>
  <nav class="flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700" aria-label="Breadcrumb">
    <ol class="inline-flex items-center space-x-1 md:space-x-3">
      <li class="inline-flex items-center">
        <component
          :is="path === '/' ? 'span' : 'router-link'"
          to="/"
          class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
          <img
            class="mr-2"
            src="@/assets/icons/grid.svg"
            width="20"
            height="20"
            alt="courses"
          />
          Courses
        </component>
      </li>
      <li v-for="(crumb, crumbIndex) in breadcrumbs" :key="crumb.title">
        <div class="flex items-center">
          <svg aria-hidden="true" class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
          <component
            :is="crumbIndex + 1 === breadcrumbs.length ? 'span' : 'router-link'"
            :to="crumb.to"
            class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
          >
            {{ crumb.title }}
          </component>
        </div>
      </li>
    </ol>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  props: {
    breadcrumbs: {
      type: Array as PropType<{
        title: string;
        to: string;
      }[]>,
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

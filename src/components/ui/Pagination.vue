<template>
  <div class="pagination-wrapper flex justify-center">
    <ul class="pagination inline-flex items-center -space-x-px">
      <li
        class="block px-3 py-2 ml-0 leading-tight cursor-pointer text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        :class="{'pointer-events-none opacity-50 cursor-default': currentPage <= 1}"
        @click="setCurrentPage(currentPage - 1)"
      >
        <a>Prev</a>
      </li>
      <li
        v-for="pageNumber in pageNumbers"
        :key="pageNumber"
        class="px-3 py-2 leading-tight text-gray-500 cursor-pointer bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        :class="{ 'z-10 text-blue-600 border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white': pageNumber === currentPage }"
        @click="setCurrentPage(pageNumber)"
      >
        <a>{{ pageNumber }}</a>
      </li>
      <li
        class="block px-3 py-2 ml-0 leading-tight text-gray-500 cursor-pointer bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        :class="{'pointer-events-none opacity-50 cursor-default': currentPage >= totalPages}"
        @click="setCurrentPage(currentPage + 1)"
      >
        <a>Next</a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    totalItems: {
      type: Number,
      required: true
    },
    itemsPerPage: {
      type: Number,
      default: 10
    },
    currentPage: {
      type: Number,
      default: 1
    }
  },
  emits: ['update:currentPage'],
  computed: {
    totalPages(): number {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    },
    pageNumbers(): number[] {
      const startPage = Math.max(1, this.currentPage - 2);
      const endPage = Math.min(this.totalPages, this.currentPage + 2);
      const pages = [];
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      return pages;
    }
  },
  methods: {
    setCurrentPage(pageNumber: number): void {
      if (pageNumber >= 1 && pageNumber <= this.totalPages) {
        this.$emit('update:currentPage', pageNumber);
      }
    }
  }
});
</script>

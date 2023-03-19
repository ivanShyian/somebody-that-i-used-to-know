<template>
  <PageWrapper
    class="page-courses"
    :is-loading="isCoursesLoading"
    :is-error="isCoursesError"
  >

    <ul class="grid grid-cols-3 justify-items-center items-center gap-8 pb-8 lg:grid-cols-2 md:grid-cols-1">
      <CourseCard
        v-for="course in paginatedCourses"
        :key="course.id"
        :course="course"
      />
    </ul>

    <Pagination
      v-if="courses"
      v-model:current-page="currentPage"
      :total-items="courses.length"
      :items-per-page="itemsPerPage"
    />

  </PageWrapper>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useCoursesQuery } from '@/composables/useCoursesQuery';
import { usePagination } from '@/composables/usePagination';

import PageWrapper from '@/components/ui/PageWrapper.vue';
import CourseCard from '@/components/pages/courses/CourseCard.vue';
import Pagination from '@/components/ui/Pagination.vue';

export default defineComponent({
  components: {
    Pagination,
    CourseCard,
    PageWrapper
  },
  async setup() {
    const { courses, isCoursesLoading, isCoursesError } = useCoursesQuery();
    const { currentPage, itemsPerPage, postsRange } = usePagination();

    const paginatedCourses = computed(() => {
      return courses.value?.slice(...postsRange.value);
    })

    return {
      paginatedCourses,
      isCoursesLoading,
      isCoursesError,
      itemsPerPage,
      currentPage,
      courses,
    };
  }
});
</script>

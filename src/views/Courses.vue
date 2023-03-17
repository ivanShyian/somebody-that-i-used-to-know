<template>
  <div class="PageCourses">
    <ul class="flex flex-col">
      <li
        v-for="course in courses"
        :key="course.id"
      >
        <router-link
          :to="course.meta.slug"
          class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ course.title }}</h5>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CoursesGateway } from '@/database/courses.gateway';

export default defineComponent({
  async setup() {
    const courses = await CoursesGateway.getCourses()

    return {
      courses,
    };
  }
});
</script>

<style scoped>

</style>

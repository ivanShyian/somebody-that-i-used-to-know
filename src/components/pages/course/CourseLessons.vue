<template>
  <div class="p-8 rounded-2xl md:p-2">
    <h2 class="text-3xl font-extrabold dark:text-white mb-4 md:text-2xl">Lessons:</h2>
    <div v-if="course.lessons" class="grid grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-8">
      <router-link
        v-for="lesson in course.lessons"
        :key="lesson.id"
        class="relative cursor-pointer group overflow-hidden rounded-lg"
        :to="`/${course.meta.slug}/${lesson.order}`"
      >
        <VImage
          class="group-hover:opacity-10"
          :src="`${lesson.previewImageLink}/lesson-${lesson.order}.webp`"
          alt="lesson"
        />
        <div
          class="absolute inset-0 group-hover:bg-blue-900/40 transition transition-all
          ease-in-out duration-300 md:hidden"
        />
        <p
          class="absolute z-10 -top-10 left-4 font-bold text-gray-500 dark:text-gray-100 group-hover:top-4
          transition-all ease-in-out duration-300 md:top-2"
        >
          {{ lesson.title }}
        </p>
        <p
          class="opacity-0 absolute z-10 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-8xl
          text-gray-500 dark:text-gray-100 group-hover:opacity-100 transition-all ease-in-out duration-500 md:opacity-100 md:text-2xl md:-translate-x-0 md:left-4">
          {{ lesson.order }}
        </p>
        <Duration
          class="absolute z-10 -bottom-10 left-4 group-hover:opacity-100 group-hover:bottom-4
          transition-all ease-in-out duration-300 md:bottom-4"
          :duration="lesson.duration"
          size="small"
        />
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { ICourse } from '@/types/ICourse.types';

import VImage from '@/components/ui/VImage.vue';
import Duration from '@/components/ui/Duration.vue';

export default defineComponent({
  components: { Duration, VImage },
  props: {
    course: {
      type: Object as PropType<ICourse.Model>,
      required: true,
    }
  }
});
</script>

<style scoped>

</style>

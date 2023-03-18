<template>
  <ul class="basis-3/12">
    <li
      v-for="lesson in lessons"
      :key="lesson.order"
      :class="{ 'bg-green-600/50': lesson.id === currentLessonId }"
      class="p-2 min-h-[90px] cursor-pointer border-b border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 last:border-b-0 rounded-md"
    >
      <router-link
        class="flex flex-col items-start"
        :to="`/${courseSlug}/${lesson.order}`"
      >
        <p class="text-gray-400 font-medium text-md">Lesson {{ lesson.order }}</p>
        <p class="text-gray-200 font-medium text-lg">{{ lesson.title }}</p>
        <Duration
          :duration="lesson.duration"
          size="small"
        />
      </router-link>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { ICourse } from '@/types/ICourse.types';

import Duration from '@/components/ui/Duration.vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  components: { Duration },
  props: {
    lessons: {
      type: Array as PropType<ICourse.Lesson[]>,
      required: true,
    },
    currentLessonId: {
      type: String,
      required: true,
    }
  },
  setup() {
    const route = useRoute();

    return {
      courseSlug: route.params.slug
    };
  }
});
</script>

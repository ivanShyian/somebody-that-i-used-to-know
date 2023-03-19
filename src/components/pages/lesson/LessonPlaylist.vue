<template>
  <ul class="basis-3/12">
    <template
      v-for="lesson in lessons"
      :key="lesson.order"
    >
      <LessonPlaylistItem
        :is-locked="lesson.status === 'locked'"
        :is-playing="lesson.id === currentLessonId"
        :lesson="lesson"
      />
    </template>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { ICourse } from '@/types/ICourse.types';

import LessonPlaylistItem from '@/components/pages/lesson/LessonPlaylistItem.vue';

export default defineComponent({
  components: { LessonPlaylistItem },
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
});
</script>

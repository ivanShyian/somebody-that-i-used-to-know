<template>
  <div class="p-8 rounded-2xl md:p-2">
    <h2 class="text-3xl font-extrabold dark:text-white mb-4 md:text-2xl">Lessons:</h2>
    <div v-if="course.lessons" class="grid grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-8">
      <template
        v-for="lesson in sortedLessons"
        :key="lesson.id"
      >
        <CourseLessonsItem
          :lesson="lesson"
          :course-slug="course.meta.slug"
          :is-locked="lesson.status === 'locked'"
        />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { ICourse } from '@/types/ICourse.types';

import VImage from '@/components/ui/VImage.vue';
import Duration from '@/components/ui/Duration.vue';
import CourseLessonsItem from '@/components/pages/course/CourseLessonsItem.vue';

export default defineComponent({
  components: { CourseLessonsItem },
  props: {
    course: {
      type: Object as PropType<ICourse.Model>,
      required: true,
    }
  },
  setup(props) {
    const sortedLessons = computed(() => {
      if (props.course) {
        return [...props.course.lessons].sort((a, b) => a.order - b.order);
      }
      return [];
    })

    return {
      sortedLessons
    }
  },
});
</script>

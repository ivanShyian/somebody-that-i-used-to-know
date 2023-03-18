<template>
  <PageWrapper
    :is-loading="isCourseLoading"
    :is-error="isCourseError"
    :breadcrumbs="breadcrumbs"
    class="page-lesson min-h-screen"
  >
    <div class="relative flex flex-col flex-1 h-full">
      <Card
        class="flex gap-x-8"
        :is-animation-enabled="false"
      >
        <LessonVideo :lesson="currentLesson">
          <template #playlist>
            <LessonPlaylist
              :lessons="lessons"
              :current-lesson-id="currentLesson?.id"
            />
          </template>
        </LessonVideo>
      </Card>
    </div>
  </PageWrapper>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { useCourseQuery } from '@/composables/useCourseQuery';
import { convertPathToTitle } from '@/utils/convertPathToTitle';

import PageWrapper from '@/components/ui/PageWrapper.vue';
import Card from '@/components/ui/Card.vue';
import LessonVideo from '@/components/pages/lesson/LessonVideo.vue';
import LessonPlaylist from '@/components/pages/lesson/LessonPlaylist.vue';

export default defineComponent({
  components: {
    LessonPlaylist,
    LessonVideo,
    Card,
    PageWrapper,
  },
  setup() {
    const route = useRoute();

    const { slug, lessonNumber } = route.params;
    const { course, isCourseLoading, isCourseError } = useCourseQuery(slug as string)


    const lessons = computed(() => course.value?.lessons);
    const currentLesson = computed(() => lessons.value?.[Number(lessonNumber) - 1]);

    // Ugly
    const breadcrumbs = computed(() => {
      const splitPath = route.path.split('/');
      return [{
        title: convertPathToTitle(splitPath[1]),
        to: `/${splitPath[1]}`
      }, {
        title: 'Lesson ' + convertPathToTitle(splitPath[2]),
      }]
    })

    return {
      isCourseLoading,
      isCourseError,
      currentLesson,
      lessons,
      breadcrumbs,
    }
  },
})
</script>

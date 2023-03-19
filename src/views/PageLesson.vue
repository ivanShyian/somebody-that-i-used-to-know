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
              :lessons="sortedLessons"
              :current-lesson-id="currentLesson?.id"
            />
          </template>
        </LessonVideo>
      </Card>
    </div>
  </PageWrapper>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, ref, toRef, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCourseQuery } from '@/composables/useCourseQuery';
import { convertPathToTitle } from '@/utils/convertPathToTitle';

import PageWrapper from '@/components/ui/PageWrapper.vue';
import Card from '@/components/ui/Card.vue';
import LessonVideo from '@/components/pages/lesson/LessonVideo.vue';
import LessonPlaylist from '@/components/pages/lesson/LessonPlaylist.vue';
import { useLastViewed } from '@/composables/useRecentlyVisited';

export default defineComponent({
  components: {
    LessonPlaylist,
    LessonVideo,
    Card,
    PageWrapper,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();

    const isLessonLocked = ref(false);
    const { slug, lessonNumber } = route.params;
    const slugString = slug as string;

    const { course, isCourseLoading, isCourseError } = useCourseQuery(slugString);
    const { setLastViewed } = useLastViewed(slugString);

    const sortedLessons = computed(() => {
      if (course.value) {
        return [...course.value.lessons].sort((a, b) => a.order - b.order);
      }
      return [];
    })
    const currentLesson = computed(() => sortedLessons.value?.[Number(lessonNumber) - 1]);

    // Beauty
    const breadcrumbs = computed(() => {
      const [, previousPage, nextPage] = route.path.split('/');
      return [{
        title: convertPathToTitle(previousPage),
        to: `/${previousPage}`
      }, {
        title: 'Lesson ' + convertPathToTitle(nextPage),
      }]
    })

    const watcher = watch(currentLesson, (lesson) => {
      if (lesson && lesson.status === 'locked') {
        isLessonLocked.value = true;
        router.push(`/${slug}`);
      }
    }, {
      immediate: true,
    })

    onBeforeUnmount(() => {
      if (isLessonLocked.value) return;
      setLastViewed(currentLesson.value.order);
      watcher();
    });

    return {
      isCourseLoading,
      isCourseError,
      sortedLessons,
      currentLesson,
      breadcrumbs,
    }
  },
})
</script>

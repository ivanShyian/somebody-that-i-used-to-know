<template>
  <div class="PageCourse">
    <PageWrapper
      class="page-courses"
      :is-loading="isCourseLoading"
      :is-error="isCourseError"
      :breadcrumbs="breadcrumbs"
    >
      <Card
        v-if="course"
        :is-animation-enabled="false"
      >
        <CourseInfo
          :course="course"
          :is-continue-watch-shown="!!lastViewedLessonId"
          @route-to-last-lesson="routeToLastLesson"
        />
        <CourseLessons :course="course" />
      </Card>
    </PageWrapper>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCourseQuery } from '@/composables/useCourseQuery';
import { convertPathToTitle } from '@/utils/convertPathToTitle';

import PageWrapper from '@/components/ui/PageWrapper.vue';
import Card from '@/components/ui/Card.vue';
import CourseInfo from '@/components/pages/course/CourseInfo.vue';
import CourseLessons from '@/components/pages/course/CourseLessons.vue';
import { useLastViewed } from '@/composables/useRecentlyVisited';


export default defineComponent({
  components: {
    CourseLessons,
    CourseInfo,
    PageWrapper,
    Card,
  },
  async setup() {
    const route = useRoute();
    const router = useRouter();

    const { slug } = route.params;
    const { course, isCourseLoading, isCourseError } = useCourseQuery(route.params.slug as string);

    const breadcrumbs = computed(() => [{
      title: convertPathToTitle(route.path.split('/')[1])
    }]);

    const { lastViewedLessonId } = useLastViewed(slug as string);

    function routeToLastLesson() {
      router.push(`/${slug}/${lastViewedLessonId.value}`);
    }

    return {
      isCourseLoading,
      isCourseError,
      course,
      breadcrumbs,
      lastViewedLessonId,
      routeToLastLesson,
    };
  }
});
</script>

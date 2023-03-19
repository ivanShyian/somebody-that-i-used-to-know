<template>
  <div class="w-full">
    <div class="flex items-center justify-between">
      <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-xl lg:text-2xl">
        Lesson {{ lesson.order }}: {{ lesson.title }}
      </h1>
    </div>
    <div class="flex flex-col items-start gap-x-4 w-full">

      <LessonVideoWrapper
        :current-video-speed="currentVideoSpeed"
        :is-pip-active="isPIPActive"
        :is-waiting="isWaiting"
        :is-error-occurred="isErrorOccurred"
        @enable-pip-mode="requestPip"
      >
        <video
          ref="videoReference"
          class="w-full h-auto max-w-full relative transition-opacity duration-500"
          playsinline
          muted
          autoplay
          controls
        />
      </LessonVideoWrapper>


      <div class="w-full">
        <slot name="playlist" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { ICourse } from '@/types/ICourse.types';
import { useVideoStream } from '@/composables/useVideoStream';

import LessonVideoWrapper from '@/components/pages/lesson/LessonVideoWrapper.vue';

export default defineComponent({
  components: {
    LessonVideoWrapper,
  },
  props: {
    lesson: {
      type: Object as PropType<ICourse.Lesson>,
      required: true,
    },
  },
  setup(props) {
    const videoReference = ref(null);

    return {
      videoReference,
      ...useVideoStream({
        lesson: props.lesson,
        videoReference
      }),
    }
  }
});
</script>

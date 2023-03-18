<template>
  <div class="w-full">
    <div class="flex items-center justify-between">
      <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-xl lg:text-2xl">
        Lesson {{ lesson.order }}: {{ lesson.title }}
      </h1>
    </div>
    <div class="flex flex-col items-start gap-x-4 w-full">
      <div class="w-full rounded-md overflow-clip relative">

        <video
          ref="videoReference"
          :class="{
            'pointer-events-none': isErrorOccurred,
            'opacity-100': true,
          }"
          class="w-full h-auto max-w-full relative opacity-0 transition-opacity duration-500"
          playsinline
          muted
          autoplay
          controls
        />

        <div
          v-if="isErrorOccurred"
          class="absolute z-10 bottom-0 right-0"
        >
          <p class="text-white text-4xl">Ooops! Something went wrong!</p>
          <img
            width="900"
            height="551"
            src="@/assets/img/error-image.png"
            alt="error"
            class="md:w-[450px] h-[275px]"
          >
        </div>

        <Progress
          v-else-if="isWaiting"
          class="!absolute z-10 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
        />

      </div>
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
import Progress from '@/components/ui/Progress.vue';

export default defineComponent({
  components: { Progress },
  props: {
    lesson: {
      type: Object as PropType<ICourse.Lesson>,
      required: true,
    },
  },
  setup(props) {
    const videoReference = ref(null);

    const { isErrorOccurred, isWaiting } = useVideoStream({
      lesson: props.lesson,
      videoReference
    });

    return {
      videoReference,
      isErrorOccurred,
      isWaiting,
    }
  }
});
</script>

<style scoped>

</style>

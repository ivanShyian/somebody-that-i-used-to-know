<template>
  <div class="w-full rounded-md overflow-clip relative">
    <div
      :class="{ 'pointer-events-none': isErrorOccurred }"
      class="w-full h-full"
    >
      <slot />
    </div>

    <LessonVideoControls
      :is-pip-active="isPipActive"
      @enable-pip-mode="$emit('enablePipMode')"
    />

    <LessonVideoSpeedPopup
      :current-speed="currentVideoSpeed"
    />

    <LessonVideoError
      v-if="isErrorOccurred"
      class="absolute z-10 bottom-0 right-0"
    />

    <VProgress
      v-else-if="isWaiting"
      class="!absolute z-10 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import LessonVideoSpeedPopup from '@/components/pages/lesson/LessonVideoSpeedPopup.vue';
import LessonVideoError from '@/components/pages/lesson/LessonVideoError.vue';
import VProgress from '@/components/ui/VProgress.vue';
import LessonVideoControls from '@/components/pages/lesson/LessonVideoControls.vue';

export default defineComponent({
  components: { LessonVideoControls, VProgress, LessonVideoError, LessonVideoSpeedPopup },
  props: {
    isErrorOccurred: {
      type: Boolean,
      required: true,
    },
    isWaiting: {
      type: Boolean,
      required: true,
    },
    isPipActive: {
      type: Boolean,
      required: true,
    },
    currentVideoSpeed: {
      type: Number,
      required: true,
    }
  },
  emits: ['enablePipMode'],
});
</script>

<template>
  <div class="course-info flex lg:flex-wrap gap-12 lg:gap-4 mb-8">
    <div class="basis-2/3 lg:basis-full">
      <img
        class="h-full w-full rounded-lg md:h-40 md:object-cover"
        :src="course.previewImageLink + '/cover.webp'"
        alt="image description"
      >
    </div>
    <div class="flex flex-col justify-between basis-1/3 lg:basis-full">
      <div>
        <div class="flex gap-x-4">
          <h1
            class="text-4xl mb-4 font-extrabold lg:text-3xl leading-none
            tracking-tight text-gray-900 md:text-2xl lg:text-6xl dark:text-white"
          >
            {{ course.title }}
          </h1>
          <div class="flex flex-col">
            <span
              v-for="(tag, tagIndex) in course.tags"
              :key="tagIndex"
              class="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5
              rounded dark:bg-yellow-900 dark:text-yellow-300"
            >
              {{ tag }}
            </span>
          </div>
        </div>

        <p
          class="text-lg font-light text-gray-500 md:text-xl dark:text-gray-400 mb-4"
        >
          {{ course.description }}
        </p>

        <ul class="flex flex-wrap gap-1 mb-4">
          <li
            v-for="(skill, skillIndex) in course.meta.skills"
            :key="skillIndex"
          >
            <span class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">{{ skill }}</span>
          </li>
        </ul>

      </div>
      <div
        class="flex flex-col gap-y-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-x-3">
            <Rating
              :rating="course.rating"
              size="medium"
              color="text-yellow-300"
            />
            <p class="text-lg font-bold text-gray-500 dark:text-gray-200 -mb-1">{{ course.rating }}</p>
          </div>
          <Duration :duration="course.duration" />
        </div>
        <VButton
          v-if="isContinueWatchShown"
          @click="$emit('routeToLastLesson')"
        >
          Continue watching
        </VButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { ICourse } from '@/types/ICourse.types';
import { normalizeDuration } from '@/utils/normalizeDuration';

import Rating from '@/components/ui/Rating.vue';
import VButton from '@/components/ui/VButton.vue';
import Duration from '@/components/ui/Duration.vue';

export default defineComponent({
  components: { Duration, VButton, Rating },
  props: {
    course: {
      type: Object as PropType<ICourse.Model>,
      required: true,
    },
    isContinueWatchShown: {
      type: Boolean,
      default: false,
    }
  },
  emits: [
    'routeToLastLesson',
  ],
  setup(props) {
    const duration = computed(() => normalizeDuration(props.course.duration));

    return {
      duration,
    }
  }
});
</script>

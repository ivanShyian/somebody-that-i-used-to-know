<template>
  <div class="course-info flex lg:flex-wrap gap-12 lg:gap-4 mb-8">
    <div class="basis-2/3 lg:basis-full">
      <img
        class="h-auto w-full rounded-lg md:h-40 md:object-cover"
        :src="course.previewImageLink + '/cover.webp'"
        alt="image description"
      >
    </div>
    <div class="flex flex-col justify-between pt-4 basis-1/3 lg:basis-full">
      <div>
        <div class="flex gap-x-4">
          <h1
            class="text-4xl mb-4 font-extrabold lg:text-4xl leading-none
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
      </div>
      <div class="flex flex-col gap-y-4">
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
        <VButton>Continue watching</VButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { ICourse } from '@/types/ICourse.types';
import Rating from '@/components/ui/Rating.vue';
import VButton from '@/components/ui/VButton.vue';
import { normalizeDuration } from '@/utils/normalizeDuration';
import Duration from '@/components/ui/Duration.vue';

export default defineComponent({
  components: { Duration, VButton, Rating },
  props: {
    course: {
      type: Object as PropType<ICourse.Model>,
      required: true,
    }
  },
  setup(props) {
    const duration = computed(() => normalizeDuration(props.course.duration));

    return {
      duration
    }
  }
});
</script>

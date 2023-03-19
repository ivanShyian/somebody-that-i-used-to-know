<template>
  <div
    :class="{ 'opacity-50 pointer-events-none': isLocked }"
    class="relative cursor-pointer group overflow-hidden rounded-lg relative"
    @click="routeToPath(`/${courseSlug}/${lesson.order}`)"
  >
    <VImage
      class="group-hover:opacity-10"
      :src="`${lesson.previewImageLink}/lesson-${lesson.order}.webp`"
      alt="lesson"
    />
    <div
      class="absolute inset-0 group-hover:bg-blue-900/40 transition transition-all
      ease-in-out duration-300 md:hidden"
    />
    <p
      class="absolute z-10 -top-10 left-4 font-bold text-gray-500 dark:text-gray-100 group-hover:top-4 sm:text-sm
      transition-all ease-in-out duration-300 md:top-2"
    >
      {{ lesson.title }}
    </p>
    <p
      v-if="!isLocked"
      class="opacity-0 absolute z-10 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-8xl
      text-gray-500 dark:text-gray-100 group-hover:opacity-100 transition-all ease-in-out duration-500
      md:opacity-100 md:text-2xl md:-translate-x-0 md:left-4"
    >
      {{ lesson.order }}
    </p>
    <Duration
      class="absolute z-10 -bottom-10 left-4 group-hover:opacity-100 group-hover:bottom-4
      transition-all ease-in-out duration-300 md:bottom-4"
      :duration="lesson.duration"
      size="small"
    />
    <img
      v-if="isLocked"
      src="@/assets/icons/lock.svg"
      class="absolute top-4 right-4"
      width="33"
      height="33"
      alt="lock"
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Duration from '@/components/ui/Duration.vue';
import VImage from '@/components/ui/VImage.vue';
import { useRouter } from 'vue-router';
import { ICourse } from '@/types/ICourse.types';

export default defineComponent({
  components: {
    VImage,
    Duration
  },
  props: {
    courseSlug: {
      type: String,
      required: true,
    },
    lesson: {
      type: Object as PropType<ICourse.Lesson>,
      required: true,
    },
    isLocked: {
      type: Boolean,
      require: true,
    }
  },
  setup(props) {
    const router = useRouter()
    function routeToPath(path: string) {
      if (props.isLocked) return;
      router.push(path);
    }

    return {
      routeToPath,
    };
  }
});
</script>

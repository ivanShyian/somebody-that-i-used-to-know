<template>
  <li
    :class="{
      'bg-green-600/50 dark:hover:bg-green-600/60': isPlaying,
      'opacity-50 pointer-events-none': isLocked,
    }"
    class="p-2 relative flex min-h-[90px] cursor-pointer border-b border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 last:border-b-0 rounded-md"
  >
    <div
      class="flex flex-col items-start basis-4/5"
      @click="routeToLesson(`/${courseSlug}/${lesson.order}`)"
    >
      <p class="text-gray-400 font-medium text-md">Lesson {{ lesson.order }}</p>
      <p class="text-gray-200 font-medium text-lg">{{ lesson.title }}</p>
      <Duration
        :duration="lesson.duration"
        size="small"
      />
    </div>
    <img
      v-if="isLocked"
      class="absolute right-4 top-1/2 -translate-y-1/2"
      src="@/assets/icons/lock.svg"
      width="42"
      height="42"
      alt="lock"
    />
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ICourse } from '@/types/ICourse.types';
import Duration from '@/components/ui/Duration.vue';

export default defineComponent({
  components: { Duration },
  props: {
    isLocked: {
      type: Boolean,
      required: true,
    },
    isPlaying: {
      type: Boolean,
      required: true,
    },
    lesson: {
      type: Object as PropType<ICourse.Lesson>,
      required: true,
    }
  },
  setup(props) {
    const route = useRoute();
    const router = useRouter();

    function routeToLesson(path: string) {
      if (props.isLocked) return;
      router.push(path);
    }

    return {
      courseSlug: route.params.slug,
      routeToLesson,
    };
  }
});
</script>

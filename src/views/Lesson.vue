<template>
  <div class="PageLesson relative min-h-screen">
    <div v-if="isCourseLoading" class="absolute z-10 inset-0 bg-red-500"></div>
    <Container>
        <div class="flex py-12 gap-x-8">
          <div class="basis-9/12 bg-blue-1100">
            <div class="p-4 block bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div class="flex items-center justify-between">
              <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                {{ currentLesson?.title }}
              </h1>
            </div>
            <video id="video-stream" class="w-full h-auto max-w-full" controls/>
            </div>
          </div>
          <ul class="basis-3/12">
            <div class="p-4 block bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <li
              v-for="lesson in lessons"
              :key="lesson.order"
              class="py-2 flex justify-between items-center border-b hover:bg-gray-100 dark:hover:bg-gray-700 last:border-b-0"
            >
              <span class="text-white font-bold text-xl basis-4/5">{{ lesson.title }}</span>
              <span class="text-white text-sm basis-1/5 text-end">{{ lesson.duration }}</span>
            </li>
            </div>
          </ul>
        </div>
    </Container>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useCourseQuery } from '@/composables/useCourseQuery';
import Hls from 'hls.js';
import Container from '@/components/ui/Container.vue';

export default defineComponent({
  components: { Container },
  setup() {
    const route = useRoute();
    const { slug, lessonNumber } = route.params as { slug: string; lessonNumber: string };
    const { course, isCourseLoading } = useCourseQuery(slug)


    const lessons = computed(() => course.value?.lessons);
    const currentLesson = computed(() => {
      return lessons.value?.[Number(lessonNumber) - 1];
    })

    watch(currentLesson, (newValue) => {
      console.log(newValue)
      if (newValue) runHls(newValue.link);
    });

    async function runHls(lessonLink: string) {
      const video = document.getElementById('video-stream') as HTMLMediaElement;
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(lessonLink);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play();
        });
        return;
      }
      if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8';
        video.addEventListener('loadedmetadata', () => {
          video.play();
        });
      }
    }

    return {
      isCourseLoading,
      currentLesson,
      lessons,
    }
  },
})
</script>

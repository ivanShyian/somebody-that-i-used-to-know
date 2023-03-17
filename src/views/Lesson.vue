<template>
  <div class="PageLesson min-h-screen">
    <!-- @TODO Fixme -->
    <Breadcrumbs
      :breadcrumbs="[{
        to: '/',
        title: 'Course',
      }, {
        to: '/',
        title: 'Lesson'
      }]"
    />
    <div class="relative flex flex-col flex-1 h-full">
      <Container :class="['transition transition-all duration-500', isCourseLoading ? 'opacity-0' : 'opacity-100']">
        <div class="flex py-12 gap-x-8">
          <div class="basis-9/12 bg-blue-1100">
            <div class="p-4 block bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div class="flex items-center justify-between">
                <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                  {{ currentLesson?.title }}
                </h1>
              </div>
              <video
                id="video-stream"
                class="w-full h-auto max-w-full"
                playsinline
                controls
              />
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
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onUnmounted, reactive, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useCourseQuery } from '@/composables/useCourseQuery';
import Hls from 'hls.js';
import Container from '@/components/ui/Container.vue';
import Breadcrumbs from '@/components/ui/Breadcrumbs.vue';

// @FIXME After page change video can't start

export default defineComponent({
  components: { Breadcrumbs, Container },
  setup() {
    const hls = reactive(new Hls());
    const route = useRoute();
    const { slug, lessonNumber } = route.params as { slug: string; lessonNumber: string };
    const { course, isCourseLoading } = useCourseQuery(slug)


    const lessons = computed(() => course.value?.lessons);
    const currentLesson = computed(() => {
      return lessons.value?.[Number(lessonNumber) - 1];
    })

    watch(currentLesson, (newValue) => {
      if (newValue) {
        runStream({
          link: newValue.link,
          id: newValue.id
        });
      }
    }, {
      immediate: true
    });

    async function runStream({ link, id }: { link: string, id: string }) {
      const video = document.getElementById('video-stream') as HTMLVideoElement;

      video.addEventListener('timeupdate', () => {
        localStorage.setItem(id + '-last-second', JSON.stringify(video.currentTime));
      });

      if (Hls.isSupported()) {
        hls.loadSource(link);
        hls.attachMedia(video);
        return hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.currentTime = checkCurrentTime(id);
          video.play();
        });
      }
      if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8';
        video.addEventListener('loadedmetadata', () => {
          video.currentTime = checkCurrentTime(id);
          video.play();
        });
      }
    }

    onUnmounted(() => {
      hls.destroy();
    })

    function checkCurrentTime(id: string): number {
      const lastSecond = localStorage.getItem(id + '-last-second');
      if (lastSecond) {
        return Number(lastSecond);
      }
      return 0;
    }

    return {
      isCourseLoading,
      currentLesson,
      lessons,
    }
  },
})
</script>

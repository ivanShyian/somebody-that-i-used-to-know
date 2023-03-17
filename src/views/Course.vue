<template>
  <div class="PageCourse py-12">
    <Container v-if="!isCourseLoading">
      <div class="flex gap-12 mb-8">
        <div class="basis-3/5">
          <img
            class="h-auto w-full rounded-lg"
            :src="course.previewImageLink + '/cover.webp'"
            alt="image description"
          >
        </div>
        <div class="flex flex-col justify-between py-4 basis-2/5">
          <div>
            <div class="flex gap-x-4">
              <h1
                class="text-4xl mb-4 font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                {{ course.title }}
              </h1>
              <div class="flex flex-col">
                <span
                  v-for="(tag, tagIndex) in course.tags"
                  :key="tagIndex"
                  class="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
            <p
              class="text-lg font-light text-gray-500 md:text-xl dark:text-gray-400"
            >
              {{ course.description }}
            </p>
          </div>
          <div class="flex items-center gap-x-6">
            <Rating :rating="course.rating" size="large" color="text-yellow-300"/>
            <p class="text-xl font-light text-gray-500 md:text-xl dark:text-gray-200">{{ course.rating }}</p>
          </div>
        </div>
      </div>
      <!---->
      <div class="p-8 rounded-2xl">
        <h2 class="text-3xl font-extrabold dark:text-white mb-4">Lessons:</h2>
        <div class="grid grid-cols-3 gap-8">
          <div v-for="lesson in course.lessons" :key="lesson.id" class="relative cursor-pointer group overflow-hidden rounded-lg">
            <VImage
              class="group-hover:opacity-10"
              :src="`${lesson.previewImageLink}/lesson-${lesson.order}.webp`"
              alt="lesson"
            />
            <div
              class="absolute inset-0 group-hover:bg-blue-900/40 transition transition-all ease-in-out duration-300"></div>
            <p
              class="absolute z-10 -top-10 left-4 font-bold text-gray-500 dark:text-gray-100 group-hover:top-4 transition-all ease-in-out duration-300">
              {{ lesson.title }}
            </p>
            <p class="opacity-0 absolute z-10 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-8xl text-gray-500 dark:text-gray-100 group-hover:opacity-100 transition-all ease-in-out duration-500">
              {{ lesson.order }}
            </p>
            <p
              class="absolute z-10 -bottom-10 left-4 font-light text-gray-500 dark:text-gray-400 group-hover:bottom-4 transition-all ease-in-out duration-300">
              {{ lesson.duration }}
            </p>
          </div>
        </div>
      </div>
    </Container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import Container from '@/components/ui/Container.vue';
import Rating from '@/components/ui/Rating.vue';
import VImage from '@/components/ui/VImage.vue';
import { useCourseQuery } from '@/composables/useCourseQuery';

export default defineComponent({
  components: {
    VImage,
    Rating,
    Container
  },
  async setup() {
    const route = useRoute();

    const { course, isCourseLoading } = useCourseQuery(route.params.slug as string)

    return {
      isCourseLoading,
      course,
    };
  }
});
</script>

<style scoped>

</style>

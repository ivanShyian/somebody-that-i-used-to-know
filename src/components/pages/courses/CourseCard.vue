<template>
    <router-link
      :to="course.meta.slug"
      class="courses-item w-full h-full"
    >
      <Card>
        <li class="flex flex-col gap-4 h-full">
          <img
            class="h-52 object-cover lg:h-48 md:h-full rounded-md"
            :src="course.previewImageLink + '/cover.webp'"
            alt="cover"
          />
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white md:text-xl min-h-[64px]">{{ course.title }}</h5>
          <div class="mt-auto">
            <p class="text-xl md:text-sm font-light text-gray-500 md:text-xl dark:text-gray-200 line-clamp-2">{{ course.description }}</p>
          </div>
          <VButton class="pointer-events-none">To lessons</VButton>
        </li>
      </Card>
    </router-link>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { ICourses } from '@/types/ICourses.types';
import VButton from '@/components/ui/VButton.vue';
import Card from '@/components/ui/Card.vue';

export default defineComponent({
  components: { Card, VButton },
  props: {
    course: {
      type: Object as PropType<ICourses.Model>,
      required: true,
    }
  }
})
</script>

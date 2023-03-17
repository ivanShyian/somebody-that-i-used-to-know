<template>
  <div class="PageHome">
    <p class="font-bold text-7xl mb-4">Home</p>

    <div class="flex">
      <div>
        <pre class="text-xs">{{ course }}</pre>
      </div>
      <div>
        {{ videoUri }}
        <video id="video" width="352" height="198" playsinline controls>
<!--          <source :src="`https://crossorigin.me/${course.meta.courseVideoPreview.link}`" type="application/x-mpegURL">-->
<!--          <source :src="`https://crossorigin.me/${course.meta.courseVideoPreview.link}`" type="application/vnd.apple.mpegurl">-->
        </video>
<!--        {{ course.meta.courseVideoPreview.link }}-->
<!--        <video id="video" width="352" height="198" controls>-->
<!--          <source :src="videoUri" type="application/x-mpegURL">-->
<!--                    <source :src="course.meta.courseVideoPreview.link" type="application/vnd.apple.mpegurl">-->
<!--        </video>-->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { usePokemonStore } from '@/store/courses';
import Hls from 'hls.js';
import axios from 'axios';
import { str } from 'video.js';

export default defineComponent({
  async setup() {
    const courses = usePokemonStore();
    const course = await courses.getCourse();

    return {
      course
    };
  },
});
</script>

<style lang="scss" scoped>
.PageHome {
}
</style>

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

  data: () => ({
    videoUri: '',
  }),

  mounted() {
    this.$nextTick(() => {
      this.runHls();
    });
  },
  methods: {
    async runHls() {
      const { data: metadata } = await axios.get(this.course.meta.courseVideoPreview.link)
      if (metadata) {
        const streamInfo = metadata.split('#EXT-X-STREAM-INF:')[2]
        const streamLink = streamInfo.split('\n')[1]
        const validStreamLink = 'https://wisey.app/videos/win-your-life-back/preview/AppleHLS1/' + streamLink

        const video = document.getElementById('video') as HTMLMediaElement;
        if (Hls.isSupported()) {
          const hls = new Hls();
          hls.loadSource(validStreamLink);
          hls.attachMedia(video);
          hls.on(Hls.Events.MANIFEST_PARSED, function() {
            video.play();
          });
        }
          // hls.js is not supported on platforms that do not have Media Source Extensions (MSE) enabled.
          // When the browser has built-in HLS support (check using `canPlayType`), we can provide an HLS manifest (i.e. .m3u8 URL) directly to the video element through the `src` property.
          // This is using the built-in support of the plain video element, without using hls.js.
          // Note: it would be more normal to wait on the 'canplay' event below however on Safari (where you are most likely to find built-in HLS support) the video.src URL must be on the user-driven
        // white-list before a 'canplay' event will be emitted; the last video event that can be reliably listened-for when the URL is not on the white-list is 'loadedmetadata'.
        else if (video.canPlayType('application/vnd.apple.mpegurl')) {
          video.src = 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8';
          video.addEventListener('loadedmetadata', function() {
            video.play();
          });
        }
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.PageHome {
}
</style>

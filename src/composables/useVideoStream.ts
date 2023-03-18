import { onBeforeUnmount, reactive, ref, Ref, watch } from 'vue';
import { ICourse } from '@/types/ICourse.types';
import Hls, { ErrorData } from 'hls.js';
import throttle from 'lodash.throttle';
interface IProps {
  lesson: ICourse.Lesson;
  videoReference: Ref<HTMLMediaElement | null>;
}

interface IRunStreamProps {
  video: HTMLVideoElement;
  link: string;
  id: string
}

export function useVideoStream({ lesson, videoReference }: IProps) {
  const THROTTLE_WAIT = 100;
  const hls = reactive(new Hls({
    // Fixing error: failed to execute 'postMessage' on 'Worker'
    enableWorker: false,
  }));

  const isErrorOccurred = ref(false);
  const isBeenDestroyed = ref(false);
  const isWaiting = ref(false);

  watch([lesson, videoReference], ([lesson, video]) => {
    if (lesson?.link && video instanceof HTMLVideoElement) {
      runStream({
        video,
        link: lesson.link,
        id: lesson.id
      });
    }
  }, {
    immediate: true
  });

  function runStream({ video, link, id }: IRunStreamProps) {
    video.addEventListener('timeupdate', () => {
      saveCurrentTime(video.currentTime, id);
    });

    if (Hls.isSupported()) {
      hls.loadSource(link);
      hls.attachMedia(video);

      hls.on(Hls.Events.ERROR, errorListener);
      hls.on(Hls.Events.BUFFER_APPENDED, throttle(() => {
        bufferListener(video);
      }, THROTTLE_WAIT));
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setCurrentTimeAndPlay(video, id);
      });

      return
    }

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = link;
      video.addEventListener('loadedmetadata', () => {
        setCurrentTimeAndPlay(video, id);
      });
      video.addEventListener('error', errorListener)
    }
  }

  function checkCurrentTime(id: string): number {
    const lastSecond = localStorage.getItem(id + '-last-second');
    if (lastSecond) {
      return Number(lastSecond);
    }
    return 0;
  }

  function errorListener(event: string | ErrorEvent, data?: ErrorData) {
    if (event instanceof ErrorEvent) {
      console.error(event.message);
    } else if (data) {
      console.error(event, data.error?.message || data.type);
    }
    destroyVideoListeners();
    isErrorOccurred.value = true;
  }

  function bufferListener(video: HTMLVideoElement) {
    isWaiting.value = !(video.readyState === 4 && !video.paused);
  }

  function setCurrentTimeAndPlay(video: HTMLVideoElement, id: string) {
    video.currentTime = checkCurrentTime(id);
    video.play().then();
  }

  function saveCurrentTime(videoCurrentTime: number, id: string) {
    localStorage.setItem(id + '-last-second', JSON.stringify(videoCurrentTime));
  }

  function destroyVideoListeners() {
    const video = videoReference.value as HTMLVideoElement;
    const id = lesson.id;

    hls.off(Hls.Events.MANIFEST_PARSED, () => {
      setCurrentTimeAndPlay(video, id)
    })
    hls.off(Hls.Events.BUFFER_APPENDED, throttle(() => {
      bufferListener(video);
    }, THROTTLE_WAIT));
    hls.off(Hls.Events.ERROR, errorListener)
    hls.destroy();


    video.removeEventListener('timeupdate', () => {
      saveCurrentTime(video.currentTime, id);
    });
    video.removeEventListener('loadedmetadata', () => (
      setCurrentTimeAndPlay(video, id)
    ));

    isBeenDestroyed.value = true;
  }

  onBeforeUnmount(() => {
    if (isBeenDestroyed.value) return;
    destroyVideoListeners();
  })

  return {
    isErrorOccurred,
    isWaiting,
  };
}

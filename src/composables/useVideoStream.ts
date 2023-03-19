import { computed, onBeforeUnmount, reactive, ref, Ref, watch } from 'vue';
import { ICourse } from '@/types/ICourse.types';
import { useRoute } from 'vue-router';

import Hls, { ErrorData } from 'hls.js';
import throttle from 'lodash.throttle';
interface IProps {
  lesson: ICourse.Lesson;
  videoReference: Ref<HTMLVideoElement | null>;
}

interface IRunStreamProps {
  video: HTMLVideoElement;
  link: string;
  id: string
}

const THROTTLE_WAIT = 100;
const LAST_SECOND_STORAGE = 'LAST_SECOND_STORAGE';

export function useVideoStream({ lesson, videoReference }: IProps) {
  // FIXME Add reference of hls instance to window object ->
  // FIXME while user go in pip mode.
  // FIXME Hls instance must be destroyed ->
  // FIXME if the user route to the same page where pip was enabled

  const route = useRoute();

  const hls = reactive(new Hls({
    // Fixing error: failed to execute 'postMessage' on 'Worker'
    enableWorker: false,
  }));

  const initialLessonRoute = `/${route.params.slug}/${route.params.lessonNumber}`;

  const isPIPActive = ref(false);
  const isErrorOccurred = ref(false);
  const isBeenDestroyed = ref(false);
  const isWaiting = ref(false);

  const currentVideoSpeed = ref(1);
  const currentVideoTime = ref(0);

  const isDestroyUnavailable = computed(() => isBeenDestroyed.value || isPIPActive.value);

  const watcher = watch([lesson, videoReference], ([lesson, video]) => {
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

  // Methods
  function runStream({ video, link, id }: IRunStreamProps) {
    video.addEventListener('keydown', handleKeydownListener);
    video.addEventListener('ratechange', handleRateChange)
    video.addEventListener('timeupdate', () => {
      setCurrentTime(video.currentTime);
    });
    video.addEventListener('enterpictureinpicture', () => {
      isPIPActive.value = true;
    });
    video.addEventListener('leavepictureinpicture', () => {
      pipLeaveListener(video);
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

  function setCurrentTime(videoCurrentTime: number) {
    currentVideoTime.value = videoCurrentTime;
  }

  function checkCurrentTime(id: string): number {
    const lastSecondStorage = _getLastSecondStorage()
    if (Object.keys(lastSecondStorage).length) {
      return Number(lastSecondStorage[id] || 0);
    }
    return 0;
  }

  function saveCurrentTime(videoCurrentTime: number, id: string) {
    const lastSecondMap = _getLastSecondStorage();

    localStorage.setItem(LAST_SECOND_STORAGE, JSON.stringify({
      ...lastSecondMap,
      [id]: videoCurrentTime,
    }));
  }

  function requestPip() {
    if (document.pictureInPictureEnabled) {
      videoReference.value?.requestPictureInPicture().then();
    }
  }

  function _getLastSecondStorage() {
    const lastSecond = localStorage.getItem(LAST_SECOND_STORAGE);
    if (lastSecond) return JSON.parse(lastSecond);
    return {};
  }

  function speedUp(video: HTMLVideoElement) {
    if (video.playbackRate < 2) video.playbackRate += 0.25
  }
  function speedDown(video: HTMLVideoElement) {
    if (video.playbackRate > 0.5) video.playbackRate -= 0.25
  }

  // Listeners
  function handleRateChange(event: Event) {
    const target = event.target as HTMLVideoElement;
    currentVideoSpeed.value = target.playbackRate;
  }

  function handleKeydownListener(event: KeyboardEvent) {
    // @TODO Move key codes to composable args to give ability user change these keys
    const video = event.target as HTMLVideoElement;
    if (event.code === 'Period') speedUp(video);
    else if (event.code === 'Comma') speedDown(video);
  }

  function bufferListener(video: HTMLVideoElement) {
    isWaiting.value = video.readyState !== 4 && !video.paused;
  }

  function pipLeaveListener(video: HTMLVideoElement) {
    isPIPActive.value = false;
    if (route.path === initialLessonRoute) return;
    const videoClosure = video;
    saveCurrentTime(currentVideoTime.value, lesson.id);
    destroyVideoListeners(videoClosure);
  }

  function setCurrentTimeAndPlay(video: HTMLVideoElement, id: string) {
    video.currentTime = checkCurrentTime(id);
    video.play().then();
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

  function destroyVideoListeners(videoArg?: HTMLVideoElement) {
    const video = videoArg || videoReference.value as HTMLVideoElement;
    const id = lesson.id;

    hls.off(Hls.Events.MANIFEST_PARSED, () => {
      setCurrentTimeAndPlay(video, id)
    })
    hls.off(Hls.Events.BUFFER_APPENDED, throttle(() => {
      bufferListener(video);
    }, THROTTLE_WAIT));
    hls.off(Hls.Events.ERROR, errorListener)
    hls.destroy();

    video.removeEventListener('keydown',  handleKeydownListener);
    video.removeEventListener('ratechange', handleRateChange)
    video.removeEventListener('timeupdate', () => {
      setCurrentTime(video.currentTime);
    });
    video.removeEventListener('loadedmetadata', () => (
      setCurrentTimeAndPlay(video, id)
    ));
    video.removeEventListener('enterpictureinpicture', () => {
      isPIPActive.value = true;
    });
    video.removeEventListener('leavepictureinpicture', () => {
      pipLeaveListener(video);
    });

    isBeenDestroyed.value = true;
  }

  // Vue events
  onBeforeUnmount(() => {
    if (isDestroyUnavailable.value) return;
    saveCurrentTime(currentVideoTime.value, lesson.id);
    destroyVideoListeners();
    watcher();
  })

  return {
    isErrorOccurred,
    isPIPActive,
    isWaiting,
    currentVideoSpeed,

    requestPip,
  };
}

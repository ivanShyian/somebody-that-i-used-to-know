import { computed } from 'vue';

const LAST_VIEWED = 'LAST_VIEWED';

export function useLastViewed(slug: string) {
  const lastViewedLessonId  = computed(() => {
    const lastViewed = _getLocalStorage();
    if (Object.keys(lastViewed)) {
      return lastViewed[slug];
    }
    return '';
  })

  function setLastViewed(lessonOrder: number) {
    const lastViewed = _getLocalStorage();

    localStorage.setItem(LAST_VIEWED, JSON.stringify({
      ...lastViewed,
      [slug]: lessonOrder,
    }));
  }

  function _getLocalStorage(): Record<string, string> {
    const lastViewed = localStorage.getItem(LAST_VIEWED);
    if (lastViewed) return JSON.parse(lastViewed);
    return {};
  }

  return {
    setLastViewed,
    lastViewedLessonId,
  }
}

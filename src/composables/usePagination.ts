import { computed, ComputedRef, onBeforeUnmount, Ref, ref, toRef, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

interface IReturnType {
  itemsPerPage: number;
  currentPage: Ref<number>;
  postsRange: ComputedRef<number[]>;
}

export function usePagination(itemsPerPage = 6): IReturnType {
  const route = useRoute();
  const router = useRouter();
  const _page = ref(Number(route.query.page) || 1);

  const currentPage = computed({
    get() {
      return _page.value;
    },
    set(page: number) {
      return router.push({
        path: '/',
        query: { page },
      })
    },
  })

  const postsRange = computed(() => [
    (currentPage.value - 1) * itemsPerPage,
    (currentPage.value - 1) * itemsPerPage + itemsPerPage
  ]);

  const watcher = watch(toRef(route, 'query'), (newValue) => {
    if (newValue?.page) _page.value = Number(newValue.page);
  }, {
    deep: true,
    immediate: true,
  })

  onBeforeUnmount(() => {
    watcher();
  });

  return {
    itemsPerPage,
    currentPage,
    postsRange,
  }
}

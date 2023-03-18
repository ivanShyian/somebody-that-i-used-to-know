<template>
  <div class="duration flex items-center">
    <img
      class="mr-2"
      src="@/assets/icons/duration.svg"
      width="20"
      height="20"
      alt="duration"
    />
    <span
      :class="fontSize"
      class="text-gray-500 dark:text-gray-200 font-bold -mb-1"
    >
      {{ formattedDuration }}
    </span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { normalizeDuration } from '@/utils/normalizeDuration';

export default defineComponent({
  props: {
    duration: {
      type: Number,
      required: true,
    },
    size: {
      type: String as PropType<'small' | 'default'>,
      default: 'default'
    }
  },
  setup(props) {
    const formattedDuration = computed(() => normalizeDuration(props.duration))
    const fontSize = computed(() => ({
      'text-lg': props.size === 'default',
      'text-md': props.size === 'small',
    }))

    return {
      formattedDuration,
      fontSize
    }
  }
});
</script>

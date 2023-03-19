<template>
  <div class="flex w-full justify-between px-2 py-4 md:flex-col">
    <div class="flex items-center gap-x-8 md:gap-x-0 md:flex-col md:items-start md:gap-y-4 md:mb-4">
      <span class="text-2xl text-white font-bold">Additional features: </span>
      <VButton
        v-if="!isPipActive"
        @click="$emit('enablePipMode')"
      >
        Picture-in-picture
      </VButton>
    </div>
    <!-- There is no adjust speed logic. Only the clue -->
    <div class="text-gray-400 text-sm font-thin">
      <p>To speed up press ">" button</p>
      <p>To speed down press "{{ "<" }}" button</p>
      <small class="text-gray-500">Note: your focus must be on video</small>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import VButton from '@/components/ui/VButton.vue';

export default defineComponent({
  components: { VButton },
  props: {
    isPipActive: {
      type: Boolean,
      default: false,
    }
  },
  emits: [
    'enablePipMode',
  ],
});
</script>

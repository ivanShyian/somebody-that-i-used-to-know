<template>
  <div class="error-block absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
    <Card :is-animation-enabled="false">
      <p class="text-red-400 text-3xl leading-relaxed">Something went wrong.<br>Please try a little bit later...</p>
    </Card>
  </div>
</template>

<script>
import Card from '@/components/ui/Card.vue';

export default {
  components: { Card },
  setup() {


    return {};
  }
};
</script>

<style lang="scss" scoped>

</style>

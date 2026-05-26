<script setup lang="ts">
import type { SortConfig } from "@/types/workflow";
interface IProps {
  direction: SortConfig["direction"];
}

const props = withDefaults(defineProps<IProps>(), {
  direction: "asc",
});
</script>

<template>
  <div :class="$style.workflowTableSort">
    <i v-if="props.direction === 'desc'" class="fa-solid fa-sort-down"></i>
    <i v-else class="fa-solid fa-sort-up"></i>
  </div>
</template>

<style lang="scss" module>
.workflowTableSort {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

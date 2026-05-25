<script setup lang="ts">
import { computed, watch } from "vue";
import { VueFlow, useVueFlow, MarkerType } from "@vue-flow/core";
import { Background } from "@vue-flow/background";
import { Controls } from "@vue-flow/controls";
import { useWorkflowStore } from "@/stores/workflow";
import type { Node, Edge } from "@vue-flow/core";

const store = useWorkflowStore();
const { onNodeClick, onNodeDragStop } = useVueFlow();

// Преобразуем steps в nodes для Vue Flow
const nodes = computed<Node[]>(() => {
  return store.steps.map((step) => ({
    id: String(step.initialIndex),
    type: "default",
    position: { x: step.x, y: step.y },
    data: { label: step.name },
    style: {
      border: `3px solid ${step.color}`,
      borderRadius: "8px",
      padding: "3px",
      backgroundColor:
        store.selectedStepId === step.initialIndex ? step.color : "white",
      color: store.selectedStepId === step.initialIndex ? "white" : step.color,
      fontWeight: "600",
      fontSize: "12px",
      minWidth: "120px",
      textAlign: "center",
      whiteSpace: "nowrap",
    },
  }));
});

// Преобразуем nextSteps в edges для Vue Flow
const edges = computed<Edge[]>(() => {
  const result: Edge[] = [];

  store.steps.forEach((step) => {
    step.nextSteps.forEach((nextStepIndex) => {
      result.push({
        id: `e${step.initialIndex}-${nextStepIndex}`,
        source: String(step.initialIndex),
        target: String(nextStepIndex),
        type: "default",
        markerEnd: MarkerType.Arrow,
        style: {
          strokeWidth: 2,
          stroke: "#666",
        },
      });
    });
  });

  return result;
});

// Обработка клика по ноде
onNodeClick((event) => {
  const nodeId = Number(event.node.id);
  store.selectStep(nodeId);
});

// Обработка перетаскивания ноды
onNodeDragStop((event) => {
  const nodeId = Number(event.node.id);
  const { x, y } = event.node.position;

  // Обновляем координаты в store и на сервере
  store.updateStepCoordinates(nodeId, Math.round(x), Math.round(y));
});

// Следим за изменением выделенного элемента для обновления стилей
watch(
  () => store.selectedStepId,
  () => {
    // Vue Flow автоматически обновит стили через computed nodes
  },
);
</script>

<template>
  <div :class="$style.diagram">
    <VueFlow
      :nodes="nodes"
      :edges="edges"
      :fit-view-on-init="true"
      :min-zoom="0.2"
      :max-zoom="4"
      :default-viewport="{ zoom: 1, x: 0, y: 0 }"
    >
      <Background pattern-color="#aaa" :gap="16" />
      <Controls />
    </VueFlow>
  </div>
</template>

<style module lang="scss">
.diagram {
  width: 100%;
  height: 100%;
  position: relative;

  :global(.vue-flow__node) {
    cursor: pointer;
    width: auto !important;

    &:hover {
      transform: scale(1.05);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
  }

  :global(.vue-flow__edge-path) {
    transition: stroke 0.2s ease;
  }

  :global(.vue-flow__controls) {
    button {
      border: 1px solid #ddd;
      background: white;

      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
</style>

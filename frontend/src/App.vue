<script setup lang="ts">
import { onMounted } from "vue";
import { useWorkflowStore } from "@/stores/workflow";
import WorkflowDiagram from "@/components/Diagram/WorkflowDiagram.vue";
import WorkflowTable from "@/components/Table/WorkflowTable.vue";
import { debounce } from "./utils/debounce";

const store = useWorkflowStore();

const handleCreateStep = debounce(async () => {
  await store.addStep();
});

onMounted(() => {
  store.loadSortConfig();
  store.fetchSteps();
});
</script>

<template>
  <div :class="$style.app">
    <ElContainer direction="horizontal">
      <!-- Left Panel: Table -->
      <ElAside width="50%" :class="$style.leftPanel">
        <div :class="$style.panelHeader">
          <h2>Структура рабочего процесса</h2>
          <ElButton type="primary" @click="handleCreateStep">
            <template #icon>
              <i class="fa fa-plus"></i>
            </template>
            Создать состояние
          </ElButton>
        </div>
        <div :class="$style.tableContainer">
          <WorkflowTable v-if="!store.loading" />
          <p v-else>Загрузка...</p>
        </div>
      </ElAside>

      <!-- Right Panel: Diagram -->
      <ElMain :class="$style.rightPanel">
        <div :class="$style.diagramContainer">
          <WorkflowDiagram v-if="!store.loading" />
          <p v-else>Загрузка диаграммы...</p>
        </div>
      </ElMain>
    </ElContainer>
  </div>
</template>

<style module lang="scss">
.app {
  width: 100%;
  height: 100vh;
  padding: 50px;
  box-sizing: border-box;
  background-color: #f5f5f5;

  :global(.el-container) {
    height: 100%;
    gap: 20px;
  }
}

.leftPanel {
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.panelHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e0e0e0;

  h2 {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
    color: #333;
  }
}

.tableContainer {
  flex: 1;
  overflow: auto;
}

.rightPanel {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.diagramContainer {
  width: 100%;
  height: 100%;
  background-color: #fafafa;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
  overflow: hidden;
}
</style>

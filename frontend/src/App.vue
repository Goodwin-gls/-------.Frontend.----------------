<script setup lang="ts">
import { onMounted } from "vue";
import { useWorkflowStore } from "@/stores/workflow";

const store = useWorkflowStore();

onMounted(() => {
  store.loadSortConfig();
  store.fetchSteps();
});
</script>

<template>
  <div class="app">
    <ElContainer direction="horizontal">
      <!-- Left Panel: Table -->
      <ElAside width="50%" class="left-panel">
        <div class="panel-header">
          <h2>Структура рабочего процесса</h2>
          <ElButton type="primary">
            <template #icon>
              <i class="fa fa-plus"></i>
            </template>
            Создать состояние
          </ElButton>
        </div>
        <div class="table-container">
          <!-- Таблица будет здесь -->
          <p v-if="store.loading">Загрузка...</p>
          <p v-else>Таблица состояний ({{ store.steps.length }} шагов)</p>
        </div>
      </ElAside>

      <!-- Right Panel: Diagram -->
      <ElMain class="right-panel">
        <div class="diagram-container">
          <!-- Диаграмма будет здесь -->
          <p v-if="store.loading">Загрузка...</p>
          <p v-else>Диаграмма</p>
        </div>
      </ElMain>
    </ElContainer>
  </div>
</template>

<style scoped lang="scss">
.app {
  width: 100%;
  height: 100vh;
  padding: 50px;
  box-sizing: border-box;
  background-color: #f5f5f5;
}

.el-container {
  height: 100%;
  gap: 20px;
}

.left-panel {
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.panel-header {
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

.table-container {
  flex: 1;
  overflow: auto;
}

.right-panel {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.diagram-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fafafa;
  border-radius: 4px;
  border: 1px dashed #d0d0d0;
}
</style>

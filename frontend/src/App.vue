<script setup lang="ts">
import { onMounted } from 'vue'
import { useWorkflowStore } from '@/stores/workflow'

const store = useWorkflowStore()

onMounted(() => {
  store.loadSortConfig()
  store.fetchSteps()
})
</script>

<template>
  <div class="app">
    <el-container>
      <el-header>
        <h1>Workflow Editor</h1>
      </el-header>
      <el-main>
        <el-row v-if="store.loading" justify="center">
          <el-col :span="24" style="text-align: center; padding: 50px;">
            <el-icon class="is-loading" :size="40">
              <i class="fa fa-spinner fa-spin"></i>
            </el-icon>
            <p>Загрузка...</p>
          </el-col>
        </el-row>
        <el-row v-else :gutter="20">
          <el-col :span="24">
            <p>Проект успешно настроен! Количество шагов: {{ store.steps.length }}</p>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
.app {
  width: 100%;
  height: 100vh;
}

.el-header {
  background-color: #409eff;
  color: white;
  display: flex;
  align-items: center;

  h1 {
    margin: 0;
    font-size: 24px;
    font-weight: 600;
  }
}

.el-main {
  background-color: #f5f5f5;
}
</style>


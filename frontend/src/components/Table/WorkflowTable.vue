<script setup lang="ts">
import { useWorkflowStore } from "@/stores/workflow";

const store = useWorkflowStore();

const handleRowClick = (initialIndex: number) => {
  store.selectStep(initialIndex);
};

const handleEdit = (initialIndex: number) => {
  console.log("Edit step:", initialIndex);
  // TODO: Implement edit functionality
};

const handleDelete = (initialIndex: number) => {
  console.log("Delete step:", initialIndex);
  // TODO: Implement delete functionality
};

const getStepName = (initialIndex: number) => {
  const step = store.steps.find((s) => s.initialIndex === initialIndex);
  return step?.name || "";
};

const getStepColor = (initialIndex: number) => {
  const step = store.steps.find((s) => s.initialIndex === initialIndex);
  return step?.color || "#666666";
};
</script>

<template>
  <div :class="$style.tableWrapper">
    <table :class="$style.table">
      <thead :class="$style.thead">
        <tr>
          <th :class="$style.thLeft">Состояние</th>
          <th :class="$style.thRight">x</th>
          <th :class="$style.thRight">y</th>
          <th :class="$style.thLeft">Переходы</th>
          <th :class="$style.thActions"></th>
        </tr>
      </thead>
      <tbody :class="$style.tbody">
        <tr
          v-for="step in store.filteredSteps"
          :key="step.initialIndex"
          :class="[
            $style.row,
            store.selectedStepId === step.initialIndex && $style.rowSelected,
          ]"
          @click="handleRowClick(step.initialIndex)"
        >
          <td :class="$style.tdLeft">
            <i class="fa fa-file" :style="{ color: step.color }"></i>
            <span :class="$style.stepName">{{ step.name }}</span>
          </td>
          <td :class="$style.tdRight">{{ step.x }}</td>
          <td :class="$style.tdRight">{{ step.y }}</td>
          <td :class="$style.tdLeft">
            <div :class="$style.transitions">
              <template
                v-for="(nextStepIndex, index) in step.nextSteps"
                :key="nextStepIndex"
              >
                <span :class="$style.transitionItem">
                  <i
                    class="fa fa-file"
                    :style="{ color: getStepColor(nextStepIndex) }"
                  ></i>
                  <span :class="$style.transitionName">{{
                    getStepName(nextStepIndex)
                  }}</span>
                </span>
                <span v-if="index < step.nextSteps.length - 1">, </span>
              </template>
              <span
                v-if="step.nextSteps.length === 0"
                :class="$style.noTransitions"
                >—</span
              >
            </div>
          </td>
          <td :class="$style.tdActions">
            <ElButton
              text
              @click.stop="handleEdit(step.initialIndex)"
              color="#bababa"
            >
              <template #icon>
                <i class="fa fa-pencil"></i>
              </template>
            </ElButton>
            <ElButton
              text
              @click.stop="handleDelete(step.initialIndex)"
              color="#bababa"
            >
              <template #icon>
                <i class="fa fa-trash"></i>
              </template>
            </ElButton>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style module lang="scss">
.tableWrapper {
  width: 100%;
  height: 100%;
  overflow: auto;
}

.table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.thead {
  background-color: #f5f5f5;
  position: sticky;
  top: 0;
  z-index: 10;

  th {
    padding: 12px 16px;
    font-weight: 600;
    color: #666;
    text-align: left;
    white-space: nowrap;
  }
}

.thLeft {
  text-align: left;
}

.thRight {
  text-align: right;
}

.thActions {
  width: 100px;
  text-align: center;
}

.tbody {
  tr {
    background-color: white;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #fafafa;
    }
  }
}

.row {
  td {
    padding: 12px 16px;
    vertical-align: middle;
  }
}

.rowSelected {
  background-color: #f0f0f0 !important;
}

.tdLeft {
  text-align: left;

  i {
    margin-right: 8px;
    font-size: 14px;
  }
}

.tdRight {
  text-align: right;
  color: #666;
}

.tdActions {
  text-align: center;
  white-space: nowrap;

  :global(.el-button) {
    padding: 4px 8px;
    margin: 0 2px;
    color: #666;

    &:hover {
      color: #409eff;
    }

    i {
      font-size: 14px;
    }
  }
}

.stepName {
  font-weight: 500;
  white-space: nowrap;
}

.transitions {
  display: flex;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.transitionItem {
  display: inline-flex;
  align-items: center;
  white-space: nowrap;

  i {
    margin-right: 6px;
    font-size: 12px;
  }
}

.transitionName {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.noTransitions {
  color: #999;
}
</style>

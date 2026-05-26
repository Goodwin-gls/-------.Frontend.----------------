<script setup lang="ts">
import { useWorkflowStore } from "@/stores/workflow";
import { debounce } from "@/utils/debounce";

import { default as WorkflowTableSort } from "./WorkflowTableSort.vue";

const store = useWorkflowStore();

const dialogVisible = ref(false);
const editedName = ref("");
const editedStepIndex = ref<number | null>(null);

const handleRowClick = (initialIndex: number) => {
  store.selectStep(initialIndex);
};

const handleEdit = async () => {
  if (editedStepIndex.value !== null) {
    await store.updateStepName(editedStepIndex.value, editedName.value);
  }
  dialogVisible.value = false;
};

const handleDelete = async (initialIndex: number) => {
  console.log("Delete step:", initialIndex);
  await store.deleteStep(initialIndex);
};

const debouncedDelete = debounce(handleDelete, 300);

const handleSort = (column: string) => {
  store.setSortConfig(column);
};

const showEditDialog = (initialIndex: number) => {
  editedName.value = store.stepsDict[initialIndex]?.name || "";
  editedStepIndex.value = initialIndex;
  dialogVisible.value = true;
};
</script>

<template>
  <div :class="$style.tableWrapper">
    <table :class="$style.table">
      <thead :class="$style.thead">
        <tr>
          <th
            :class="[$style.thLeft, $style.sortable]"
            @click="handleSort('name')"
          >
            Состояние
            <WorkflowTableSort
              v-if="store.sortConfig && store.sortConfig.column === 'name'"
              :direction="store.sortConfig.direction"
            />
          </th>
          <th
            :class="[$style.thRight, $style.sortable]"
            @click="handleSort('x')"
          >
            x
            <WorkflowTableSort
              v-if="store.sortConfig && store.sortConfig.column === 'x'"
              :direction="store.sortConfig.direction"
            />
          </th>
          <th
            :class="[$style.thRight, $style.sortable]"
            @click="handleSort('y')"
          >
            y
            <WorkflowTableSort
              v-if="store.sortConfig && store.sortConfig.column === 'y'"
              :direction="store.sortConfig.direction"
            />
          </th>
          <th :class="$style.thLeft">Переходы</th>
          <th :class="$style.thActions"></th>
        </tr>
      </thead>
      <tbody :class="$style.tbody">
        <tr
          v-for="step in store.sortedFilteredSteps"
          :key="step.initialIndex"
          :class="[
            $style.row,
            store.selectedStepId === step.initialIndex && $style.rowSelected,
          ]"
          @click="handleRowClick(step.initialIndex)"
        >
          <td :class="$style.tdLeft">
            <i class="fa-regular fa-file" :style="{ color: step.color }"></i>
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
                    class="fa-regular fa-file"
                    :style="{
                      color: store.stepsDict[nextStepIndex]?.color || '#666',
                    }"
                  ></i>
                  <span :class="$style.transitionName">{{
                    store.stepsDict[nextStepIndex]?.name || "Unknown"
                  }}</span>
                  <span v-if="index < step.nextSteps.length - 1">, </span>
                </span>
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
              @click.stop="showEditDialog(step.initialIndex)"
              color="#bababa"
            >
              <template #icon>
                <i class="fa-solid fa-pencil"></i>
              </template>
            </ElButton>
            <ElButton
              text
              @click.stop="debouncedDelete(step.initialIndex)"
              color="#bababa"
            >
              <template #icon>
                <i class="fa-solid fa-trash"></i>
              </template>
            </ElButton>
          </td>
        </tr>
      </tbody>
    </table>
    <ElDialog v-model="dialogVisible" width="400px" :center="true">
      <template #header>
        <span>Изменить имя состояния</span>
      </template>
      <ElForm>
        <ElFormItem label="Имя состояния">
          <ElInput v-model="editedName" />
        </ElFormItem>
      </ElForm>
      <template #footer>
        <span class="dialog-footer">
          <ElButton @click="dialogVisible = false">Отмена</ElButton>
          <ElButton type="primary" @click="handleEdit">Сохранить</ElButton>
        </span>
      </template>
    </ElDialog>
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
  width: 100%;

  tr {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 0.2fr 0.2fr 1fr 100px;
  }

  th {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 12px 16px;
    font-weight: 600;
    color: #666;
    white-space: nowrap;
  }
}

.sortable {
  cursor: pointer;

  &:hover {
    color: #409eff;
  }
}

.thLeft {
  text-align: left;
}

.thRight {
  justify-content: flex-end;
}

.thActions {
  width: 100px;
  text-align: center;
}

.tbody {
  width: 100%;
  tr {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 0.2fr 0.2fr 1fr 100px;
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
    display: flex;
    align-items: center;
    overflow: hidden;
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
  justify-content: flex-end;
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
  overflow: hidden;
}

.transitionItem {
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;

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

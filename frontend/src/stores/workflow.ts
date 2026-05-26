import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { WorkflowStep, SortConfig } from "@/types/workflow";
import { workflowApi } from "@/services/api";

export const useWorkflowStore = defineStore("workflow", () => {
  // State
  const steps = ref<WorkflowStep[]>([]);
  const selectedStepId = ref<number | null>(null);
  const loading = ref(false);
  const searchQuery = ref("");
  const sortConfig = ref<SortConfig>({ column: "name", direction: "asc" });
  const workflowName = ref("wf1");

  // Getters
  const selectedStep = computed(() =>
    steps.value.find((s) => s.initialIndex === selectedStepId.value),
  );

  const stepsDict = computed(() => {
    const dict: Record<number, WorkflowStep> = {};
    steps.value.forEach((step) => {
      dict[step.initialIndex] = step;
    });
    return dict;
  });

  const filteredSteps = computed(() => {
    let result = steps.value;

    // Filter by search query
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      result = result.filter((step) => step.name.toLowerCase().includes(query));
    }

    // Sort
    result = [...result].sort((a, b) => {
      const { column, direction } = sortConfig.value;
      let aVal: any = a[column as keyof WorkflowStep];
      let bVal: any = b[column as keyof WorkflowStep];

      if (typeof aVal === "string") {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();

        return direction === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      if (aVal < bVal) return direction === "asc" ? -1 : 1;
      if (aVal > bVal) return direction === "asc" ? 1 : -1;
      return 0;
    });

    return result;
  });

  // Actions
  async function fetchSteps() {
    loading.value = true;
    try {
      const workflow = await workflowApi.getWorkflow(workflowName.value);
      steps.value = workflow.steps;
    } catch (error) {
      console.error("Failed to fetch workflow steps:", error);
      throw error;
    } finally {
      loading.value = false;
    }
  }

  async function updateStepCoordinates(
    initialIndex: number,
    x: number,
    y: number,
  ) {
    try {
      const workflow = await workflowApi.changeStepXY(
        workflowName.value,
        initialIndex,
        x,
        y,
      );
      steps.value = workflow.steps;
    } catch (error) {
      steps.value = [...steps.value]; // Trigger reactivity
      console.error("Failed to update step coordinates:", error);
      throw error;
    }
  }

  async function updateStepName(initialIndex: number, name: string) {
    // Check uniqueness
    const exists = steps.value.some(
      (s) => s.name === name && s.initialIndex !== initialIndex,
    );
    if (exists) {
      throw new Error("Step name must be unique");
    }

    try {
      const workflow = await workflowApi.changeStepName(
        workflowName.value,
        initialIndex,
        name,
      );
      steps.value = workflow.steps;
    } catch (error) {
      console.error("Failed to update step name:", error);
      throw error;
    }
  }

  async function addStep() {
    const maxIndex = Math.max(...steps.value.map((s) => s.initialIndex), -1);
    let newName = `Шаг ${steps.value.length + 1}`;

    // Ensure uniqueness
    let counter = steps.value.length + 1;
    while (steps.value.some((s) => s.name === newName)) {
      counter++;
      newName = `Шаг ${counter}`;
    }

    const newStep: Omit<WorkflowStep, "initialIndex" | "nextSteps"> = {
      name: newName,
      x: 0,
      y: 0,
      color: "#FFFFFF",
    };

    try {
      const workflow = await workflowApi.createStep(
        workflowName.value,
        newStep,
      );
      steps.value = workflow.steps;
    } catch (error) {
      console.error("Failed to add step:", error);
      throw error;
    }
  }

  async function deleteStep(initialIndex: number) {
    try {
      const workflow = await workflowApi.deleteStep(
        workflowName.value,
        initialIndex,
      );
      steps.value = workflow.steps;
      if (selectedStepId.value === initialIndex) {
        selectedStepId.value = null;
      }
    } catch (error) {
      console.error("Failed to delete step:", error);
      throw error;
    }
  }

  function selectStep(id: number | null) {
    selectedStepId.value = id;
  }

  function setSearchQuery(query: string) {
    searchQuery.value = query;
  }

  function setSortConfig(column: string) {
    const direction =
      sortConfig.value.column === column && sortConfig.value.direction === "asc"
        ? "desc"
        : "asc";
    sortConfig.value = { column, direction };
    // Save to localStorage
    localStorage.setItem("workflow-sort", JSON.stringify(sortConfig.value));
  }

  function loadSortConfig() {
    const saved = localStorage.getItem("workflow-sort");
    if (saved) {
      try {
        sortConfig.value = JSON.parse(saved);
      } catch (e) {
        console.error("Failed to load sort config:", e);
      }
    }
  }

  return {
    steps,
    selectedStepId,
    stepsDict,
    loading,
    searchQuery,
    sortConfig,
    selectedStep,
    filteredSteps,
    workflowName,
    fetchSteps,
    updateStepCoordinates,
    updateStepName,
    addStep,
    deleteStep,
    selectStep,
    setSearchQuery,
    setSortConfig,
    loadSortConfig,
  };
});

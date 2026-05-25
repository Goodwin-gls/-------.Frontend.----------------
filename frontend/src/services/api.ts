import axios from "axios";
import type { WorkflowStep, Workflow } from "@/types/workflow";

const api = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 10000,
});

export const workflowApi = {
  async getWorkflow(wfName: string = "wf1"): Promise<Workflow> {
    const response = await api.get(`/workflow/get?wfName=${wfName}`);
    return response.data;
  },

  async changeStepXY(
    wfName: string,
    initialIndex: number,
    x: number,
    y: number,
  ): Promise<void> {
    await api.post("/workflow/changeStepXY", { wfName, initialIndex, x, y });
  },

  async changeStepName(
    wfName: string,
    stepInitialIndex: number,
    name: string,
  ): Promise<void> {
    await api.post("/workflow/changeStepName", {
      wfName,
      stepInitialIndex,
      name,
    });
  },

  async createStep(
    wfName: string,
    step: Omit<WorkflowStep, "initialIndex">,
  ): Promise<void> {
    await api.post("/workflow/createStep", { wfName, ...step });
  },

  async deleteStep(wfName: string, initialIndex: number): Promise<void> {
    await api.post("/workflow/deleteStep", { wfName, initialIndex });
  },
};

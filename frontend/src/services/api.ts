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
    stepInitialIndex: number,
    x: number,
    y: number,
  ): Promise<Workflow> {
    const response = await api.post("/workflow/changeStepXY", {
      wfName,
      stepInitialIndex,
      x,
      y,
    });
    return response.data;
  },

  async changeStepName(
    wfName: string,
    stepInitialIndex: number,
    stepName: string,
  ): Promise<Workflow> {
    const response = await api.post("/workflow/changeStepName", {
      wfName,
      stepInitialIndex,
      stepName,
    });
    return response.data;
  },

  async createStep(
    wfName: string,
    step: Omit<WorkflowStep, "initialIndex" | "nextSteps">,
  ): Promise<WorkflowStep> {
    const response = await api.post("/workflow/createStep", {
      wfName,
      stepName: step.name,
      x: step.x,
      y: step.y,
      color: step.color,
    });
    return response.data;
  },

  async deleteStep(
    wfName: string,
    stepInitialIndex: number,
  ): Promise<Workflow> {
    const response = await api.post("/workflow/deleteStep", {
      wfName,
      stepInitialIndex,
    });
    return response.data;
  },
};

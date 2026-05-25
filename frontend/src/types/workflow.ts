export interface WorkflowStep {
  initialIndex: number
  name: string
  x: number
  y: number
  color: string
  nextSteps: number[]
}

export interface SortConfig {
  column: string
  direction: 'asc' | 'desc'
}

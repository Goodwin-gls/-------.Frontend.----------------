import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useWorkflowStore } from '@/stores/workflow'

describe('Workflow Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should initialize with empty steps', () => {
    const store = useWorkflowStore()
    expect(store.steps).toEqual([])
    expect(store.selectedStepId).toBeNull()
    expect(store.loading).toBe(false)
  })

  it('should select a step', () => {
    const store = useWorkflowStore()
    store.selectStep(5)
    expect(store.selectedStepId).toBe(5)
  })

  it('should set search query', () => {
    const store = useWorkflowStore()
    store.setSearchQuery('test')
    expect(store.searchQuery).toBe('test')
  })

  it('should set sort config', () => {
    const store = useWorkflowStore()
    store.setSortConfig('name', 'desc')
    expect(store.sortConfig.column).toBe('name')
    expect(store.sortConfig.direction).toBe('desc')
  })
})

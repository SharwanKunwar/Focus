// src/Store/usePlanner.js
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const usePlanner = create(
  persist(
    (set) => ({
      tasks: [],
      addTask: (payload) =>
        set((pastData) => ({ tasks: [...pastData.tasks, { ...payload, completed: false }] })),
      deleteTask: (id) => set((state) => ({ tasks: state.tasks.filter((task) => task.id !== id) })),
      updateTaskStatus: (id, status) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, status } : task
          ),
        })),
      setTasks: (newTasks) => set(() => ({ tasks: newTasks })),
      setStatus:()=>set(()=>({task}))
    }),
    { name: 'focus' }
  )
)

export const useMediumPlanner = create(
  persist(
    (set) => ({
      tasks: [],
      addTask: (payload) =>
        set((pastData) => ({ tasks: [...pastData.tasks, { ...payload, completed: false }] })),
      deleteTask: (id) => set((state) => ({ tasks: state.tasks.filter((task) => task.id !== id) })),
      updateTaskStatus: (id, completed) => set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === id ? { ...task, completed } : task
        ),
      })),
      setTasks: (newTasks) => set(() => ({ tasks: newTasks })),
    }),
    { name: 'medium' }
  )
)

export const useLowerPlanner = create(
  persist(
    (set) => ({
      tasks: [],
      addTask: (payload) =>
        set((pastData) => ({ tasks: [...pastData.tasks, { ...payload, completed: false }] })),
      deleteTask: (id) => set((state) => ({ tasks: state.tasks.filter((task) => task.id !== id) })),
      updateTaskStatus: (id, completed) => set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === id ? { ...task, completed } : task
        ),
      })),
      setTasks: (newTasks) => set(() => ({ tasks: newTasks })),
    }),
    { name: 'lower' }
  )
)

// src/Store/usePlanner.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useMediumPlanner = create(
  persist(
    (set) => ({
      tasks: [],

      // ➕ Add new task
      addTask: (payload) =>
        set((state) => ({
          tasks: [...state.tasks, { ...payload, completed: false }],
        })),

      // ❌ Delete task
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),

      // ✅ Update task status & optionally store completion time
      updateTaskStatus: (id, status, completedAt = null) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? { ...task, status, taskCompletedAt: completedAt ?? task.taskCompletedAt }
              : task
          ),
        })),

      // Replace all tasks
      setTasks: (newTasks) => set(() => ({ tasks: newTasks })),

    }),
    { name: "Medium" }
  )
);

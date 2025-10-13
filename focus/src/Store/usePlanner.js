// src/Store/usePlanner.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const usePlanner = create(
  persist(
    (set) => ({
      tasks: [],

      // ➕ Add new task
      addTask: (payload) =>
        set((state) => ({
          tasks: [{ ...payload, completed: false }, ...state.tasks],
        })),

      // ❌ Delete task
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),

      // ✅ Update task status & optionally store completion time
      updateTaskStatus: (id, status, completedAt = null) =>
          set((state) => {
            const updatedTasks = state.tasks.map((task) =>
              task.id === id
                ? { ...task, status, taskCompletedAt: completedAt ?? task.taskCompletedAt }
                : task
            );

            // Move completed tasks to bottom
            updatedTasks.sort((a, b) => {
              if (a.status === "Completed" && b.status !== "Completed") return 1;
              if (a.status !== "Completed" && b.status === "Completed") return -1;
              return 0;
            });

            return { tasks: updatedTasks };
          }),

      // Replace all tasks
      setTasks: (newTasks) => set(() => ({ tasks: newTasks })),

    }),
    { name: "focus" }
  )
);

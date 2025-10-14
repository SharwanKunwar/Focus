// src/Store/usePlanner.js
import { create } from "zustand";
import { persist } from "zustand/middleware";
import moment from "moment";


export const usePlanner = create(
  persist(
    (set, get) => ({
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

      // ✅ Update task status
      updateTaskStatus: (id, status, completedAt = null) =>
  set((state) => {
    const now = moment().format('DD MMM YYYY, h:mm a'); // current date & time
    const updatedTasks = state.tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            status,
            taskCompletedAt: completedAt ?? task.taskCompletedAt,
            taskFinishedAt: status === "Completed" ? now : task.taskFinishedAt, // ✅ store time when completed
          }
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

      // 🔁 Replace all tasks
      setTasks: (newTasks) => set(() => ({ tasks: newTasks })),

      // 📝 Store or update a task's description
      storeNote: (id, note) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task,taskNote: note } : task
          ),
        })),

      // 👀 View (get) a specific task's description
      viewNote: (id) => {
        const task = get().tasks.find((task) => task.id === id);
        return task ? task.taskNote : null;
      },
    }),
    { name: "focus" } // persisted key name
  )
);

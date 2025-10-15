// 📁 usePlanner.js
import { create } from "zustand";
import { persist } from "zustand/middleware";
import moment from "moment";

export const useAuthPlanner = create(
  persist(
    (set) => ({
      auth: {
        username: "",
        loginDate: "",
      },
      setAuth: (username) =>
        set({
          auth: {
            username,
            loginDate: moment().format("YYYY-MM-DD"),
          },
        }),
      clearAuth: () =>
        set({
          auth: { username: "", loginDate: "" },
        }),
    }),
    { name: "Auth" } // persisted key name
  )
);

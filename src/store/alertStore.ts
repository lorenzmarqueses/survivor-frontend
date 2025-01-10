"use client";
import { init } from "next/dist/compiled/webpack/webpack";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type AlertState = {
  message: string;
  show: boolean;
  type: "success" | "error";
};

export type AlertActions = {
  setMessage: (message: string, type: "success" | "error") => void;
  showMessage: (message: string, type: "success" | "error") => void;
  hideMessage: () => void;
};

export type AlertStore = AlertState & AlertActions;

export const defaultAlertState: AlertState = {
  message: "",
  show: false,
  type: "success",
};

export const useAlertStore = create(
  persist<AlertStore>(
    (set) => ({
      ...defaultAlertState,
      setMessage: (message, type) => set({ message, type, show: true }),
      showMessage: (message, type) => set({ message, type, show: true }),
      hideMessage: () => set({ show: false }),
    }),
    {
      name: "alert-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

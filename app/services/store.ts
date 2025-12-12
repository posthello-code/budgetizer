"use client";
import { create } from "zustand";

interface BudgetStore {
  budgetId: string;
  symKey: string;
  setBudgetId: (id: string) => void;
  setSymKey: (key: string) => void;
}

export const useBudgetStore = create<BudgetStore>((set) => ({
  budgetId: "",
  symKey: "",
  setBudgetId: (id: string) => set({ budgetId: id }),
  setSymKey: (key: string) => set({ symKey: key }),
}));

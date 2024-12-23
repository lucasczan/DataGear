import { create } from "zustand";
import type { IActions, IState } from "./types";

const useComponentStore = create<IState & IActions>((set) => ({
	activeComponent: null,
	setActiveComponent: (activeComponent) => set({ activeComponent }),
}));

export { useComponentStore };
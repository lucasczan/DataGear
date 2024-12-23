import { create } from "zustand";
import type { IActions, IState } from "./types";

const useCompanyStore = create<IState & IActions>((set) => ({
	activeCompany: null,
	setActiveCompany: (activeCompany) => set({ activeCompany }),
}));

export { useCompanyStore };

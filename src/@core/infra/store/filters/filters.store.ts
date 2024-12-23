import { create } from "zustand";
import type { IActions, IState } from "./types";

const useFiltersStore = create<IState & IActions>((set) => ({
	energySensorFilter: false,
	criticalStatusFilter: false,
	setcriticalStatusFilter: (value: boolean) =>
		set({ criticalStatusFilter: value }),
	setEnergySensorFilter: (value: boolean) => set({ energySensorFilter: value }),
	reset: () => set({ energySensorFilter: false }),
}));

export { useFiltersStore };

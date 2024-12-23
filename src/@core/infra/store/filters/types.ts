export interface IState {
	energySensorFilter: boolean;
	criticalStatusFilter: boolean;
}

export interface IActions {
	setEnergySensorFilter: (value: boolean) => void;
	setcriticalStatusFilter: (value: boolean) => void;
	reset: () => void;
}

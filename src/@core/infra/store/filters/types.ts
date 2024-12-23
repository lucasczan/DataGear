export interface IState {
	energySensorFilter: boolean;
}

export interface IActions {
	setEnergySensorFilter: (value: boolean) => void;
	reset: () => void;
}

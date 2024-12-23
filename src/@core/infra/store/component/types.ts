import type { INestAsset } from "@/@core/domain/application/usecases/list-assets-tree.usecase";

export interface IState {
	activeComponent: INestAsset | null;
}

export interface IActions {
	setActiveComponent: (asset: INestAsset) => void;
	reset: () => void;
}

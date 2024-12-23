import type { INestAsset, INestLocation } from "./list-assets-tree.usecase";

class HideItemBySensorTypeUseCase {
	execute(item: INestAsset | INestLocation) {
		const stringItem = JSON.stringify(item);
		const key = `"sensorType":"energy"`;
		if (!stringItem.includes(key)) return true;
		return false;
	}
}

export { HideItemBySensorTypeUseCase };

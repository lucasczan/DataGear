import type { INestAsset, INestLocation } from "./list-assets-tree.usecase";

class HideItemBySensorTypeUseCase {
	execute(item: INestAsset | INestLocation): boolean {
		if ("sensorType" in item && item.sensorType === "energy") {
			return false;
		}

		if (item.children) {
			for (const child of item.children) {
				if (!this.execute(child)) {
					return false;
				}
			}
		}

		return true;
	}
}
export { HideItemBySensorTypeUseCase };

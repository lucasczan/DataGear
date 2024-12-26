import type { INestAsset, INestLocation } from "./list-assets-tree.usecase";

class HideItemBySensorAndStatusUseCase {
	execute(item: INestAsset | INestLocation): boolean {
		const hideByStatus = "status" in item && item.status === "alert";
		const hideBySensor = "sensorType" in item && item.sensorType === "energy";

		if (hideByStatus && hideBySensor) {
			return false;
		}

		if (item.children) {
			for (const child of item.children) {
				if (!this.execute(child)) return false;
			}
		}

		return true;
	}
}
export { HideItemBySensorAndStatusUseCase };

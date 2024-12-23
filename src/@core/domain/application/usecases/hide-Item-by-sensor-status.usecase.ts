import type { INestAsset, INestLocation } from "./list-assets-tree.usecase";

class HideItemBySensorStatusUseCase {
	execute(item: INestAsset | INestLocation): boolean {
		if ("status" in item && item.status === "alert") {
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
export { HideItemBySensorStatusUseCase };

import type { INestAsset, INestLocation } from "./list-assets-tree.usecase";

interface IProps {
	item: INestAsset | INestLocation;
	term: string;
}
class HideItemCombineTermAndSensorUseCase {
	execute({ item, term }: IProps): boolean {
		const hideBySensor = "sensorType" in item && item.sensorType === "energy";
		const hideByTerm = item.name.toLowerCase().includes(term.toLowerCase());

		if (hideBySensor && hideByTerm) {
			return false;
		}

		if (item.children) {
			for (const child of item.children) {
				if (!this.execute({ item: child, term })) return false;
			}
		}

		return true;
	}
}
export { HideItemCombineTermAndSensorUseCase };

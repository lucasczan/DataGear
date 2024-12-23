import type { INestAsset, INestLocation } from "./list-assets-tree.usecase";

type Params = {
	item: INestAsset | INestLocation;
	searchTerm: string;
};

class HideItemByTermUseCase {
	execute({ item, searchTerm }: Params): boolean {
		if (!searchTerm) return false;
		return this.hideItemByName(item, searchTerm);
	}

	private hideItemByName(obj: Params["item"], searchTerm: string): boolean {
		if (obj.name) {
			if (obj.name.toLowerCase().includes(searchTerm.toLowerCase())) {
				return false;
			}
		}

		if (obj.children) {
			for (const child of obj.children) {
				const hide = this.hideItemByName(child, searchTerm);
				if (!hide) return false;
			}
		}

		return true;
	}
}

export { HideItemByTermUseCase };

import type { INestAsset, INestLocation } from "./list-assets-tree.usecase";

interface IProps {
	item: INestAsset | INestLocation;
	term: string;
}
class HideItemCombineTermAndStatusUseCase {
	execute({ item, term }: IProps): boolean {
		const hideByStatus = "status" in item && item.status === "alert";
		const hideByTerm = item.name.toLowerCase().includes(term.toLowerCase());

		if (hideByStatus && hideByTerm) {
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
export { HideItemCombineTermAndStatusUseCase };

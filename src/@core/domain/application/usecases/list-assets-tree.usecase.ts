import type { Asset } from "../../enterprise/entities/asset";
import type { Location } from "../../enterprise/entities/location";

interface INestLocation extends Location {
	children: (INestAsset | INestLocation)[];
	type: "location";
}

interface INestAsset extends Asset {
	children: (INestAsset | INestLocation)[];
	type: "asset" | "component";
}

interface ListAssetsTreeUseCaseParams {
	assets: Asset[];
	locations: Location[];
}

type treeItemsType = (INestAsset | INestLocation)[];

class ListAssetsTreeUseCase {
	execute({ assets, locations }: ListAssetsTreeUseCaseParams) {
		const tree = this.nestItems(locations, assets);
		return tree;
	}

	private nestItems(locations: Location[], assets: Asset[]) {
		const locationMap = this.makeLocationMap(locations);
		const nestedAssets = this.nestAssets(assets);
		const items = [];

		for (const asset of nestedAssets) {
			if (!asset.locationId) items.push(asset);

			if (asset.locationId) {
				const parent = locationMap.get(asset.locationId);
				if (parent) parent.children.push(asset);
			}
		}

		for (const location of locationMap.values()) {
			if (!location.parentId) items.push(location);

			if (location.parentId) {
				const parent = locationMap.get(location.parentId);
				if (parent) parent.children.push(location);
			}
		}

		return items;
	}

	private nestAssets(assets: Asset[]) {
		const assetMap = new Map<string, INestAsset>();

		for (const asset of assets) {
			assetMap.set(asset.id, {
				...asset,
				type: asset.sensorType ? "component" : "asset",
				children: [],
			});
		}

		const nestedAssets: INestAsset[] = [];

		for (const asset of assetMap.values()) {
			if (!asset.parentId) {
				nestedAssets.push(asset);
			}

			if (asset.parentId) {
				const parent = assetMap.get(asset.parentId);
				if (parent) parent.children.push(asset);
			}
		}

		return nestedAssets;
	}

	private makeLocationMap(locations: Location[]) {
		const locationMap = new Map<INestLocation["id"], INestLocation>();

		for (const location of locations) {
			locationMap.set(location.id, {
				...location,
				type: "location",
				children: [],
			});
		}

		return locationMap;
	}
}

export {
	ListAssetsTreeUseCase,
	type treeItemsType,
	type INestAsset,
	type INestLocation,
};

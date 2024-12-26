import type { Location } from "../../../@core/domain/enterprise/entities/location";
import { ListAssetsTreeUseCase } from "../../../@core/domain/application/usecases/list-assets-tree.usecase";
import type { Asset } from "../../../@core/domain/enterprise/entities/asset";
import { describe, expect, test } from "vitest";
import { ListAssetTreeMock } from "./mocks/mock";

describe("List assets tree", () => {
	test("It should build tree correctly", () => {
		const locations: Location[] = [
			{
				id: "656a07b3f2d4a1001e2144bf",
				name: "CHARCOAL STORAGE SECTOR",
				parentId: null,
			},
		];

		const assets: Asset[] = [
			{
				id: "656734821f4664001f296973",
				name: "Fan - External",
				parentId: null,
				sensorId: "MTC052",
				sensorType: "energy",
				status: "operating",
				gatewayId: "QHI640",
				locationId: "656a07b3f2d4a1001e2144bf",
			},
			{
				id: "656a07cdc50ec9001e84167b",
				name: "MOTOR RT COAL AF01",
				parentId: "656734821f4664001f296973",
				sensorId: "FIJ309",
				sensorType: "vibration",
				status: "operating",
				gatewayId: "FRH546",
			},
		];

		const useCase = new ListAssetsTreeUseCase();
		const tree = useCase.execute({ assets, locations });
		expect(tree).toEqual(ListAssetTreeMock);
	});
});

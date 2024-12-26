import { HideItemBySensorStatusUseCase } from "../../../@core/domain/application/usecases/hide-Item-by-sensor-status.usecase";
import type { INestAsset } from "../../../@core/domain/application/usecases/list-assets-tree.usecase";
import { describe, expect, test } from "vitest";

describe("Hide items by term", () => {
	test("It Should hide items when term is provided", () => {
		const usecase = new HideItemBySensorStatusUseCase();

		const assets: INestAsset[] = [
			{
				id: "656734821f4664001f296973",
				name: "Fan - External",
				parentId: null,
				sensorId: "MTC052",
				sensorType: "energy",
				status: "operating",
				gatewayId: "QHI640",
				locationId: "656a07b3f2d4a1001e2144bf",
				type: "component",
				children: [],
			},
			{
				id: "656a07cdc50ec9001e84167b",
				name: "MOTOR RT COAL AF01",
				parentId: "656734821f4664001f296973",
				sensorId: "FIJ309",
				sensorType: "vibration",
				status: "alert",
				gatewayId: "FRH546",
				type: "component",
				children: [],
			},
		];

		const firstItemIsHidden = usecase.execute(assets[0]);

		const secondItemIsHidden = usecase.execute(assets[1]);

		expect(firstItemIsHidden).toBe(true);
		expect(secondItemIsHidden).toBe(false);
	});
});

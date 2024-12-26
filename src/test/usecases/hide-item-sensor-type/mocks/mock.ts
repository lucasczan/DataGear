const ListAssetTreeMock = [
	{
		id: "656a07b3f2d4a1001e2144bf",
		name: "CHARCOAL STORAGE SECTOR",
		parentId: null,
		type: "location",
		children: [
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
				children: [
					{
						id: "656a07cdc50ec9001e84167b",
						name: "MOTOR RT COAL AF01",
						parentId: "656734821f4664001f296973",
						sensorId: "FIJ309",
						sensorType: "vibration",
						status: "operating",
						gatewayId: "FRH546",
						type: "component",
						children: [],
					},
				],
			},
		],
	},
];

export { ListAssetTreeMock };

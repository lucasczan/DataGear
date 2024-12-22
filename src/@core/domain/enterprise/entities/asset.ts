interface Asset {
	id: string;
	name: string;
	parentId: string | null;
	sensorId?: string;
	sensorType: string | null;
	status: string | null;
	gatewayId?: string;
	locationId?: string | null;
}

export type { Asset };

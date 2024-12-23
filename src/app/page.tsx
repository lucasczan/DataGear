"use client";

import { useCompanyStore } from "@/@core/infra/store/company/company.store";
import { AssetList } from "@/containers/AssetList";
import { Header } from "@/components/Header";
import { QueryRoot } from "@/components/QueryRoot";
import { useComponentStore } from "@/@core/infra/store/component/component.store";
import { ComponentPreview } from "@/containers/ComponentPreview";
import { Button } from "@/components/Button";
import { Zap } from "lucide-react";
import { useFiltersStore } from "@/@core/infra/store/filters/filters.store";

export default function Home() {
	const activeCompany = useCompanyStore((state) => state.activeCompany);
	const activeComponent = useComponentStore((state) => state.activeComponent);
	const setEnergySensorFilter = useFiltersStore(
		(store) => store.setEnergySensorFilter,
	);

	const energySensorFilter = useFiltersStore(
		(store) => store.energySensorFilter,
	);

	return (
		<QueryRoot>
			<Header />
			<div className="p-4 mt-12">
				<div className="bg-white rounded-sm p-4">
					<div className="mb-3 flex justify-between">
						<h1>
							<span className="text-xl font-semibold mr-1">Ativos</span>
							<span className="ml-1 text-gray-600">
								/ {activeCompany?.name}
							</span>
						</h1>
						<div>
							<Button
								variant={energySensorFilter ? "primary" : "outlined"}
								className="flex gap-2"
								onClick={() => setEnergySensorFilter(!energySensorFilter)}
							>
								<Zap
									size={16}
									className={
										energySensorFilter ? "text-white" : "text-blue-500"
									}
								/>
								<span className="font-semibold">Sensor de energia</span>
							</Button>
						</div>
					</div>
					<div className="flex gap-2">
						{activeCompany?.id && (
							<AssetList
								company={activeCompany}
								energySensorFilter={energySensorFilter}
							/>
						)}
						{activeComponent?.id && (
							<ComponentPreview component={activeComponent} />
						)}
					</div>
				</div>
			</div>
		</QueryRoot>
	);
}

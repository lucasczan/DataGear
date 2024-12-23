"use client";

import { useCompanyStore } from "@/@core/infra/store/company/company.store";
import { AssetList } from "@/containers/AssetList";
import { Header } from "@/components/Header";
import { QueryRoot } from "@/components/QueryRoot";
import { useComponentStore } from "@/@core/infra/store/component/component.store";
import { ComponentPreview } from "@/containers/ComponentPreview";

export default function Home() {
	const activeCompany = useCompanyStore((state) => state.activeCompany);
	const activeComponent = useComponentStore((state) => state.activeComponent);

	console.log({ activeComponent });
	return (
		<QueryRoot>
			<Header />
			<div className="p-4 mt-12">
				<div className="bg-white rounded-sm p-4">
					<h1>Ativos/{activeCompany?.name}</h1>
					<div className="flex gap-2">
						{activeCompany?.id && <AssetList company={activeCompany} />}
						{activeComponent?.id && (
							<ComponentPreview component={activeComponent} />
						)}
					</div>
				</div>
			</div>
		</QueryRoot>
	);
}

"use client";
import type { Company } from "@/@core/domain/enterprise/entities/company";
import { useGetCompanies } from "@/@core/infra/hooks/useGetCompanies";
import { useCompanyStore } from "@/@core/infra/store/company/company.store";
import { useComponentStore } from "@/@core/infra/store/component/component.store";
import { Button } from "@/components/Button";
import { Component } from "lucide-react";
import { useEffect } from "react";

const Companies: React.FC = () => {
	const { data: companies = [] } = useGetCompanies();
	const setActiveCompany = useCompanyStore((store) => store.setActiveCompany);
	const activeCompany = useCompanyStore((store) => store.activeCompany);
	const resetActiveComponent = useComponentStore((store) => store.reset);

	useEffect(() => {
		if (companies) {
			setActiveCompany(companies[0]);
		}
	}, [companies, setActiveCompany]);

	const handleClickCompany = (company: Company) => {
		if (company.id === activeCompany?.id) return;
		setActiveCompany(company);
		resetActiveComponent();
	};

	return (
		<div className="flex gap-4">
			{companies.map((company) => (
				<Button
					key={company.id}
					variant={activeCompany?.id === company.id ? "primary" : "secondary"}
					onClick={() => handleClickCompany(company)}
					type="button"
				>
					<Component size={12} color="#ffff" />
					<span className="text-xs">{company.name} unit</span>
				</Button>
			))}
		</div>
	);
};

export { Companies };

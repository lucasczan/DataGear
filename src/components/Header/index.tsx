"use client";
import type { Company } from "@/@core/domain/enterprise/entities/company";
import { useGetCompanies } from "@/@core/infra/hooks/useGetCompanies";
import { useCompanyStore } from "@/@core/infra/store/company/company.store";
import type React from "react";
import { Button } from "../Button";
import { Component } from "lucide-react";
import { useEffect } from "react";

const Header: React.FC = () => {
	const { data: companies } = useGetCompanies();
	const setActiveCompany = useCompanyStore((store) => store.setActiveCompany);
	const activeCompany = useCompanyStore((store) => store.activeCompany);

	const handleClickCompany = (company: Company) => {
		setActiveCompany(company);
	};

	useEffect(() => {
		if (companies) {
			setActiveCompany(companies[0]);
		}
	}, [companies, setActiveCompany]);

	if (!companies) return null;

	return (
		<header className="bg-blue-700 h-12 flex items-center justify-between px-4 py-3 fixed w-full top-0">
			<img src="/logo.png" alt="" />
			<div className="flex gap-4">
				{companies.map((company) => (
					<Button
						key={company.id}
						variant={activeCompany?.id === company.id ? "primary" : "secondary"}
						onClick={() => handleClickCompany(company)}
						type="button"
					>
						<Component size={12} color="#ffff" />
						{company.name}
					</Button>
				))}
			</div>
		</header>
	);
};

export { Header };

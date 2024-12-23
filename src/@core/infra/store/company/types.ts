import type { Company } from "@/@core/domain/enterprise/entities/company";

export interface IState {
	activeCompany: Company | null;
}

export interface IActions {
	setActiveCompany: (company: Company) => void;
}

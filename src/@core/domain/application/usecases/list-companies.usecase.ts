import type { Company } from "../../enterprise/entities/company";
import type { ICompanyService } from "../services/company.service";

class ListCompaniesUseCase {
	constructor(private readonly companyService: ICompanyService) {}

	async execute(): Promise<Company[]> {
		return await this.companyService.getCompanies();
	}
}

export { ListCompaniesUseCase };

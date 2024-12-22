import type { Asset } from "../../enterprise/entities/asset";
import type { Company } from "../../enterprise/entities/company";
import type { ICompanyService } from "../services/company.service";

class ListAssetsUseCase {
	constructor(private readonly companyService: ICompanyService) {}

	async execute(id: Company["id"]): Promise<Asset[]> {
		return await this.companyService.getAssets(id);
	}
}

export { ListAssetsUseCase };

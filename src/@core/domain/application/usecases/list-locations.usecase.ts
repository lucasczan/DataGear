import type { Company } from "../../enterprise/entities/company";
import type { Location } from "../../enterprise/entities/location";
import type { ICompanyService } from "../services/company.service";

class ListLocationsUseCase {
	constructor(private readonly companyService: ICompanyService) {}

	async execute(id: Company["id"]): Promise<Location[]> {
		return await this.companyService.getLocations(id);
	}
}

export { ListLocationsUseCase };

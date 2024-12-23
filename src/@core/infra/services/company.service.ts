import type { ICompanyService } from "@/@core/domain/application/services/company.service";
import type { Asset } from "@/@core/domain/enterprise/entities/asset";
import type { Company } from "@/@core/domain/enterprise/entities/company";
import type { Location } from "@/@core/domain/enterprise/entities/location";
import axios from "axios";

class CompanyService implements ICompanyService {
	baseUrl = "https://fake-api.tractian.com/";

	async getAssets(companyId: Company["id"]): Promise<Array<Asset>> {
		const response = await axios.get<Array<Asset>>(
			`${this.baseUrl}/companies/${companyId}/assets`,
		);
		return response.data;
	}

	async getLocations(companyId: Company["id"]): Promise<Array<Location>> {
		const response = await axios.get<Array<Location>>(
			`${this.baseUrl}/companies/${companyId}/locations`,
		);
		return response.data;
	}

	async getCompanies(): Promise<Array<Company>> {
		const response = await axios.get<Array<Company>>(
			`${this.baseUrl}/companies`,
		);
		return response.data;
	}
}

export { CompanyService };

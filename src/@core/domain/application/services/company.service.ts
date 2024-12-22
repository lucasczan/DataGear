import type { Asset } from "../../enterprise/entities/asset";
import type { Company } from "../../enterprise/entities/company";
import type { Location } from "../../enterprise/entities/location";

interface ICompanyService {
	getCompanies(): Promise<Array<Company>>;
	getLocations(companyId: Company["id"]): Promise<Array<Location>>;
	getAssets(companyId: Company["id"]): Promise<Array<Asset>>;
}

export type { ICompanyService };

import { useQuery } from "@tanstack/react-query";
import { CompanyService } from "../services/company.service";
import { ListLocationsUseCase } from "@/@core/domain/application/usecases/list-locations.usecase";
import type { Company } from "@/@core/domain/enterprise/entities/company";

const QUERY_KEY = "locations";

const companyService = new CompanyService();
const listLocationsUseCase = new ListLocationsUseCase(companyService);

export function useGetLocations(id: Company["id"]) {
	const query = useQuery({
		queryKey: [QUERY_KEY, id],
		queryFn: () => listLocationsUseCase.execute(id),
		staleTime: 1000 * 60 * 5, // 5 minutes
	});

	return query;
}

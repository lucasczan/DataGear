import { ListCompaniesUseCase } from "@/@core/domain/application/usecases/list-companies.usecase";
import { useQuery } from "@tanstack/react-query";
import { CompanyService } from "../services/company.service";

const QUERY_KEY = "companies";

const companyService = new CompanyService();
const listCompaniesUseCase = new ListCompaniesUseCase(companyService);

export function useGetCompanies() {
	const query = useQuery({
		queryKey: [QUERY_KEY],
		queryFn: () => listCompaniesUseCase.execute(),
		staleTime: 1000 * 60 * 5, // 5 minutes
	});

	return query;
}

import { useQuery } from "@tanstack/react-query";
import { CompanyService } from "../services/company.service";
import type { Company } from "@/@core/domain/enterprise/entities/company";
import { ListAssetsUseCase } from "@/@core/domain/application/usecases/list-assets.usecase.ts";

const QUERY_KEY = "assets";

const companyService = new CompanyService();
const listAssets = new ListAssetsUseCase(companyService);

export function useGetAssets(id: Company["id"]) {
	const query = useQuery({
		queryKey: [QUERY_KEY, id],
		queryFn: () => listAssets.execute(id),
		staleTime: 1000 * 60 * 5, // 5 minutes
	});

	return query;
}

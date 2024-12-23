import {
	type INestAsset,
	type INestLocation,
	ListAssetsTreeUseCase,
} from "@/@core/domain/application/usecases/list-assets-tree.usecase";
import type { Company } from "@/@core/domain/enterprise/entities/company";
import { useGetAssets } from "@/@core/infra/hooks/useGetAssets";
import { useGetLocations } from "@/@core/infra/hooks/useGetLocations";
import { useCallback, useMemo } from "react";
import { Item } from "./components/Item";
import { Input } from "@/components/Input";
import { LoaderCircle, Search } from "lucide-react";
import { useForm } from "./hooks/useForm";

interface IAssetListProps {
	company: Company;
	energySensorFilter: boolean;
	criticalStatusFilter: boolean;
}

const listAssetTreeUseCase = new ListAssetsTreeUseCase();

export const AssetList: React.FC<IAssetListProps> = ({
	company,
	energySensorFilter,
	criticalStatusFilter,
}) => {
	const { data: locations = [], isLoading: locationIsLoading } =
		useGetLocations(company.id);

	const { data: assets = [], isLoading: assetsIsLoading } = useGetAssets(
		company.id,
	);

	const treeItems = useMemo(
		() => listAssetTreeUseCase.execute({ assets, locations }),
		[assets, locations],
	);

	const { register, nameValue, isLoading } = useForm();

	const notFound = useMemo(
		() =>
			!JSON.stringify(treeItems)
				.toLowerCase()
				.includes(nameValue.toLowerCase()),
		[treeItems, nameValue],
	);

	const renderItem = useCallback(
		(item: INestAsset | INestLocation) => {
			return (
				<Item
					key={item?.id}
					item={item}
					searchTerm={nameValue}
					energySensorFilter={energySensorFilter}
					criticalStatusFilter={criticalStatusFilter}
				/>
			);
		},
		[nameValue, criticalStatusFilter, energySensorFilter],
	);

	if (!locations || !assets) return;

	if (locationIsLoading || assetsIsLoading)
		return (
			<div className="flex items-center gap-2">
				<LoaderCircle size={18} className="text-gray-600 animate-spin" />
				Carregando...
			</div>
		);

	return (
		<div className="flex flex-col gap-4 min-w-[50%] border-gray-200 border-[1px]   ">
			<Input
				{...register("name")}
				placeholder="Buscar Ativo ou Local"
				isLoading={isLoading}
				endIcon={<Search size={18} className="text-gray-400" />}
			/>
			<div className=" rounded-sm h-[76vh] overflow-y-auto p-4">
				{treeItems.map(renderItem)}
				{notFound && <span>Nenhum resultado para pesquisa.</span>}
			</div>
		</div>
	);
};

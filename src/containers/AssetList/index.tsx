import { ListAssetsTreeUseCase } from "@/@core/domain/application/usecases/list-assets-tree.usecase";
import type { Company } from "@/@core/domain/enterprise/entities/company";
import { useGetAssets } from "@/@core/infra/hooks/useGetAssets";
import { useGetLocations } from "@/@core/infra/hooks/useGetLocations";
import { useMemo } from "react";
import { Item } from "./components/Item";
import { Input } from "@/components/Input";
import { Search } from "lucide-react";
import { useForm } from "./hooks/useForm";

interface IAssetListProps {
	company: Company;
}

const listAssetTreeUseCase = new ListAssetsTreeUseCase();

export const AssetList: React.FC<IAssetListProps> = ({ company }) => {
	const { data: locations = [], isLoading: locationIsLoading } =
		useGetLocations(company.id);

	const { data: assets = [], isLoading: assetsIsLoading } = useGetAssets(
		company.id,
	);

	const treeItems = useMemo(
		() => listAssetTreeUseCase.execute({ assets, locations }),
		[assets, locations],
	);

	const { register, nameValue } = useForm();

	if (!locations || !assets) return;
	if (locationIsLoading || assetsIsLoading) return <div>Loading...</div>;

	return (
		<div className="flex flex-col gap-4 min-w-[50%] border-gray-200 border-[1px]   ">
			<Input
				{...register("name")}
				placeholder="Buscar Ativo ou Local"
				endIcon={<Search size={18} className="text-gray-400" />}
			/>
			<div className=" rounded-sm h-[83vh] overflow-y-auto p-4">
				{treeItems.map((item) => (
					<Item key={item?.id} item={item} searchTerm={nameValue} />
				))}
			</div>
		</div>
	);
};

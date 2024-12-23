import type { IItemProps } from "..";

type shouldHideItemParams = {
	item: IItemProps["item"];
	searchTerm: IItemProps["searchTerm"];
};

const findNameInString = (data: string, searchTerm: string) => {
	const regex = /"name":"([^"]+)"/g;
	const matches = [...data.matchAll(regex)]; // Encontra todas as ocorrências do campo "name"

	return !matches.some((match) => {
		const nameValue = match[1]; // Extrai o valor do campo "name"
		return nameValue.toLowerCase().includes(searchTerm.toLowerCase());
	});
};

function shouldHideItem({ item, searchTerm }: shouldHideItemParams) {
	if (!searchTerm) return false;
	const shouldHideItem = findNameInString(JSON.stringify(item), searchTerm);

	return shouldHideItem;
}

export { shouldHideItem };

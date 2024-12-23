type params = {
	item: object;
	searchTerm: string;
};

class HideItemByTermUseCase {
	execute({ item, searchTerm }: params) {
		if (!searchTerm) return false;
		const shouldHideItem = this.findNameInString(
			JSON.stringify(item),
			searchTerm,
		);

		return shouldHideItem;
	}

	findNameInString = (data: string, searchTerm: string) => {
		const regex = /"name":"([^"]+)"/g;
		const matches = [...data.matchAll(regex)]; // Encontra todas as ocorrências do campo "name"

		return !matches.some((match) => {
			const nameValue = match[1]; // Extrai o valor do campo "name"
			return nameValue.toLowerCase().includes(searchTerm.toLowerCase());
		});
	};
}

export { HideItemByTermUseCase };

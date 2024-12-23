import { HideItemBySensorStatusUseCase } from "@/@core/domain/application/usecases/hide-Item-by-sensor-status.usecase";
import { HideItemBySensorTypeUseCase } from "@/@core/domain/application/usecases/hide-Item-by-sensor-type.usecase";
import { HideItemByTermUseCase } from "@/@core/domain/application/usecases/hide-item-by-term.usecase";
import { useEffect, useMemo } from "react";
import type {
	INestAsset,
	INestLocation,
} from "@/@core/domain/application/usecases/list-assets-tree.usecase";

const hideItemUsecase = new HideItemByTermUseCase();
const hideItemBySensorTypeUseCase = new HideItemBySensorTypeUseCase();
const hideItemBySensorStatusUseCase = new HideItemBySensorStatusUseCase();

interface IUseFilterProps {
	searchTerm: string;
	item: INestAsset | INestLocation;
	energySensorFilter: boolean;
	criticalStatusFilter: boolean;
	setAccordionValue: (value: string | undefined) => void;
}
export const useFilters = ({
	searchTerm,
	item,
	energySensorFilter,
	criticalStatusFilter,
	setAccordionValue,
}: IUseFilterProps) => {
	const hideItem = useMemo(() => {
		if (searchTerm) return hideItemUsecase.execute({ searchTerm, item });
	}, [searchTerm, item]);

	const hideItemBySensorType = useMemo(() => {
		if (energySensorFilter) return hideItemBySensorTypeUseCase.execute(item);
	}, [item, energySensorFilter]);

	const hideItemBySensorStatus = useMemo(() => {
		if (criticalStatusFilter)
			return hideItemBySensorStatusUseCase.execute(item);
	}, [item, criticalStatusFilter]);

	useEffect(() => {
		const showByTerm = !hideItem && searchTerm.length > 0;
		const showBySensor = !hideItemBySensorType && energySensorFilter;
		const showBySensorStatus = !hideItemBySensorStatus && criticalStatusFilter;

		if (showByTerm) setAccordionValue(item.id);
		if (showBySensor) setAccordionValue(item.id);
		if (showBySensorStatus) setAccordionValue(item.id);
		if (!showByTerm && !showBySensor && !showBySensorStatus)
			setAccordionValue(undefined);
	}, [
		hideItem,
		searchTerm,
		item,
		energySensorFilter,
		hideItemBySensorType,
		criticalStatusFilter,
		hideItemBySensorStatus,
		setAccordionValue,
	]);

	return { hideItem, hideItemBySensorType, hideItemBySensorStatus };
};

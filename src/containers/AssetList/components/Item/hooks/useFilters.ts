import { HideItemBySensorStatusUseCase } from "@/@core/domain/application/usecases/hide-Item-by-sensor-status.usecase";
import { HideItemBySensorTypeUseCase } from "@/@core/domain/application/usecases/hide-Item-by-sensor-type.usecase";
import { HideItemByTermUseCase } from "@/@core/domain/application/usecases/hide-item-by-term.usecase";
import { useMemo } from "react";
import type {
	INestAsset,
	INestLocation,
} from "@/@core/domain/application/usecases/list-assets-tree.usecase";
import { useCallback } from "react";
import { HideItemCombineAllFiltersUseCase } from "@/@core/domain/application/usecases/hide-item-combine-all-filters";
import { HideItemBySensorAndStatusUseCase } from "@/@core/domain/application/usecases/hide-item-combine-sensor-type-and-status";
import { HideItemCombineTermAndSensorUseCase } from "@/@core/domain/application/usecases/hide-item-by-term-and-sensor";
import { HideItemCombineTermAndStatusUseCase } from "@/@core/domain/application/usecases/hide-item-by-term-and-status";

const hideItemByTermUseCase = new HideItemByTermUseCase();
const hideItemBySensorTypeUseCase = new HideItemBySensorTypeUseCase();
const hideItemBySensorStatusUseCase = new HideItemBySensorStatusUseCase();
const hideCombineAllFiltersUseCase = new HideItemCombineAllFiltersUseCase();

const hideItemBySensorAndStatusUseCase = new HideItemBySensorAndStatusUseCase();

const hideItemByTermAndSensorUseCase =
	new HideItemCombineTermAndSensorUseCase();

const hideItemByTermAndStatusUseCase =
	new HideItemCombineTermAndStatusUseCase();

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
	const hideBySensorAndStatus = useCallback(() => {
		return hideItemBySensorAndStatusUseCase.execute(item);
	}, [item]);

	const hideAllFilters = useCallback(() => {
		return hideCombineAllFiltersUseCase.execute({ item, term: searchTerm });
	}, [item, searchTerm]);

	const hideByCriticalStatus = useCallback(() => {
		return hideItemBySensorStatusUseCase.execute(item);
	}, [item]);

	const hideByEnergySensorType = useCallback(() => {
		return hideItemBySensorTypeUseCase.execute(item);
	}, [item]);

	const hideByTerm = useCallback(() => {
		return hideItemByTermUseCase.execute({ item, searchTerm });
	}, [item, searchTerm]);

	const hideItemByTermAndStatus = useCallback(() => {
		return hideItemByTermAndStatusUseCase.execute({ item, term: searchTerm });
	}, [item, searchTerm]);

	const hideItemByTermAndSensor = useCallback(() => {
		return hideItemByTermAndSensorUseCase.execute({ item, term: searchTerm });
	}, [item, searchTerm]);

	const handleHideItem = useCallback(() => {
		if (!energySensorFilter && !criticalStatusFilter && !searchTerm) {
			setAccordionValue(undefined);
			return false;
		}

		let hidden = false;

		if (energySensorFilter && criticalStatusFilter && searchTerm) {
			hidden = hideAllFilters();
			setAccordionValue(item.id);
			return hidden;
		}

		if (energySensorFilter && criticalStatusFilter) {
			hidden = hideBySensorAndStatus();
			setAccordionValue(item.id);
			return hidden;
		}
		if (searchTerm && criticalStatusFilter) {
			hidden = hideItemByTermAndStatus();
			setAccordionValue(item.id);
			return hidden;
		}
		if (searchTerm && energySensorFilter) {
			hidden = hideItemByTermAndSensor();
			setAccordionValue(item.id);
			return hidden;
		}

		if (criticalStatusFilter) {
			hidden = hideByCriticalStatus();
			setAccordionValue(item.id);
			return hidden;
		}

		if (energySensorFilter) {
			hidden = hideByEnergySensorType();
			setAccordionValue(item.id);
			return hidden;
		}

		if (searchTerm) {
			hidden = hideByTerm();
			setAccordionValue(item.id);
			return hidden;
		}
	}, [
		energySensorFilter,
		criticalStatusFilter,
		searchTerm,
		item,
		hideBySensorAndStatus,
		hideAllFilters,
		hideByCriticalStatus,
		hideByEnergySensorType,
		setAccordionValue,
		hideByTerm,
		hideItemByTermAndStatus,
		hideItemByTermAndSensor,
	]);

	const shouldHideItem = useMemo(() => handleHideItem(), [handleHideItem]);

	return { shouldHideItem };
};

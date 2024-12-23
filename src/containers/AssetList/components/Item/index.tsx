import type {
	INestAsset,
	INestLocation,
} from "@/@core/domain/application/usecases/list-assets-tree.usecase";
import { useComponentStore } from "@/@core/infra/store/component/component.store";
import * as Accordion from "@radix-ui/react-accordion";

import { Box, Layers2, MapPin } from "lucide-react";
import { memo, useEffect, useMemo, useState } from "react";
import { useArrow } from "./hooks/useArrow";
import { Status } from "@/components/Status";
import { HideItemByTermUseCase } from "@/@core/domain/application/usecases/hide-item-by-term.usecase";
import { HideItemBySensorTypeUseCase } from "@/@core/domain/application/usecases/hide-Item-by-sensor-type.usecase";

const hideItemUsecase = new HideItemByTermUseCase();
const hideItemBySensorTypeUseCase = new HideItemBySensorTypeUseCase();
export interface IItemProps {
	item: INestAsset | INestLocation;
	searchTerm: string;
	energySensorFilter: boolean;
}

const icon = {
	location: <MapPin className="text-blue-500" size={18} />,
	component: <Layers2 className="text-blue-500" size={18} />,
	asset: <Box className="text-blue-500" size={18} />,
};

const Item: React.FC<IItemProps> = memo(
	({ item, searchTerm, energySensorFilter, ...props }) => {
		const [accordionValue, setAccordionValue] = useState(
			searchTerm.length > 0 || energySensorFilter ? item.id : undefined,
		);

		const setActiveComponent = useComponentStore(
			(store) => store.setActiveComponent,
		);

		const hideItem = useMemo(() => {
			if (searchTerm) return hideItemUsecase.execute({ searchTerm, item });
		}, [searchTerm, item]);

		const hideItemBySensorType = useMemo(() => {
			if (energySensorFilter) return hideItemBySensorTypeUseCase.execute(item);
		}, [item, energySensorFilter]);

		const { renderArrow, setOpen, open, shouldRenderArrow } = useArrow({
			searchTerm,
			item,
			energySensorFilter,
		});

		useEffect(() => {
			const showByTerm = !hideItem && searchTerm.length > 0;
			const showBySensor = !hideItemBySensorType && energySensorFilter;

			if (showByTerm) setAccordionValue(item.id);
			if (showBySensor) setAccordionValue(item.id);
			if (!showByTerm && !showBySensor) setAccordionValue(undefined);
		}, [hideItem, searchTerm, item, energySensorFilter, hideItemBySensorType]);

		if (hideItem || hideItemBySensorType) return <></>;

		const shouldRenderStatus = "status" in item && item.status;

		function handleClick() {
			if (item.type !== "component") return;
			setActiveComponent(item);
		}

		if (item.children.length === 0) {
			const className =
				item.type === "component"
					? "flex gap-2 items-center cursor-pointer"
					: "flex gap-2 items-center cursor-default";
			return (
				<button type="button" className={className} onClick={handleClick}>
					{shouldRenderArrow && renderArrow()}
					{icon?.[item?.type] || ""} <span>{item.name}</span>{" "}
					{shouldRenderStatus && (
						<Status color={item.status === "operating" ? "green" : "red"} />
					)}
				</button>
			);
		}

		const highlighttext = !item.name
			.toLowerCase()
			.includes(searchTerm.toLowerCase())
			? "text-gray-500"
			: "text-gray-900";

		return (
			<Accordion.Root
				{...props}
				className="AccordionRoot"
				type="single"
				collapsible
				value={accordionValue}
				onValueChange={(value) => setAccordionValue(value)}
			>
				<Accordion.Item className="AccordionItem" value={item.id}>
					<Accordion.AccordionTrigger onClick={() => setOpen(!open)}>
						<span className="flex gap-2 items-center ">
							{shouldRenderArrow && renderArrow()}
							{icon?.[item?.type] || ""}{" "}
							<span className={highlighttext}>{item.name}</span>{" "}
							{shouldRenderStatus && (
								<Status color={item.status === "operating" ? "green" : "red"} />
							)}
						</span>
					</Accordion.AccordionTrigger>
					<Accordion.AccordionContent className="ml-6">
						{item.children.map((child) => (
							<Item
								key={child.id}
								item={child}
								searchTerm={searchTerm}
								energySensorFilter={energySensorFilter}
							/>
						))}
					</Accordion.AccordionContent>
				</Accordion.Item>
			</Accordion.Root>
		);
	},
);

export { Item };

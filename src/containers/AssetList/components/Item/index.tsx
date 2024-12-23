import type {
	INestAsset,
	INestLocation,
} from "@/@core/domain/application/usecases/list-assets-tree.usecase";
import { useComponentStore } from "@/@core/infra/store/component/component.store";
import * as Accordion from "@radix-ui/react-accordion";

import { Box, Layers2, MapPin } from "lucide-react";
import { memo, useMemo } from "react";
import { shouldHideItem } from "./helpers/shouldHideItem";
import { useArrow } from "./hooks/useArrow";
import { useStatus } from "./hooks/useStatus";

export interface IItemProps {
	item: INestAsset | INestLocation;
	searchTerm: string;
}

const icon = {
	location: <MapPin className="text-blue-500" size={18} />,
	component: <Layers2 className="text-blue-500" size={18} />,
	asset: <Box className="text-blue-500" size={18} />,
};

const Item: React.FC<IItemProps> = memo(({ item, searchTerm }) => {
	const setActiveComponent = useComponentStore(
		(store) => store.setActiveComponent,
	);

	const hideItem = useMemo(
		() => shouldHideItem({ searchTerm, item }),
		[searchTerm, item],
	);

	const { renderArrow, setOpen, shouldRenderArrow } = useArrow({
		searchTerm,
		item,
	});

	const { renderStatus } = useStatus();

	if (hideItem) return <></>;

	function handleClick() {
		if (item.type !== "component") return;
		setActiveComponent(item);
	}

	return (
		<Accordion.Root className="AccordionRoot" type="single" collapsible>
			<Accordion.Item className="AccordionItem" value={item.id}>
				{item.children.length > 0 && (
					<Accordion.AccordionTrigger
						asChild={!item.children.length}
						onClick={() => setOpen(!open)}
					>
						<span className="flex gap-2 items-center">
							{shouldRenderArrow && renderArrow()}
							{icon?.[item?.type] || ""} <span>{item.name}</span>{" "}
							{"status" in item && renderStatus(item?.status)}
						</span>
					</Accordion.AccordionTrigger>
				)}

				{item.children.length === 0 && (
					<button
						type="button"
						className="flex gap-2 items-center"
						onClick={handleClick}
					>
						{shouldRenderArrow && renderArrow()}
						{icon?.[item?.type] || ""} <span>{item.name}</span>{" "}
						{"status" in item && renderStatus(item?.status)}
					</button>
				)}

				{item.children.length > 0 && (
					<Accordion.AccordionContent className="ml-6">
						{item.children.map((child) => (
							<Item key={child.id} item={child} searchTerm={searchTerm} />
						))}
					</Accordion.AccordionContent>
				)}
			</Accordion.Item>
		</Accordion.Root>
	);
});

export { Item };

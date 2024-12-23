import type {
	INestAsset,
	INestLocation,
} from "@/@core/domain/application/usecases/list-assets-tree.usecase";
import { useComponentStore } from "@/@core/infra/store/component/component.store";
import * as Accordion from "@radix-ui/react-accordion";

import { Box, ChevronDown, ChevronUp, Layers2, MapPin } from "lucide-react";
import { memo, useMemo, useState } from "react";
import { shouldHideItem } from "./helpers/shouldHideItem";

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
	const [open, setOpen] = useState(Boolean(searchTerm.length));

	const hideItem = useMemo(
		() => shouldHideItem({ searchTerm, item }),
		[searchTerm, item],
	);

	const setActiveComponent = useComponentStore(
		(store) => store.setActiveComponent,
	);

	if (hideItem) return <></>;

	const shouldRenderArrow = item.children.length > 0;
	const shouldRenderStatus = item.type === "component";

	function renderArrow() {
		return open ? <ChevronDown size={18} /> : <ChevronUp size={18} />;
	}

	function renderStatus(status: INestAsset["status"]) {
		const color =
			status === "operating"
				? "bg-green-500 rounded-full w-2 h-2"
				: "bg-red-500 rounded-full w-2 h-2";
		return <span className={color} />;
	}

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
							{icon[item.type]} <span>{item.name}</span>{" "}
							{shouldRenderStatus && renderStatus(item.status)}
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
						{icon[item.type]} <span>{item.name}</span>{" "}
						{shouldRenderStatus && renderStatus(item.status)}
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

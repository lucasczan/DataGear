import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import type { IItemProps } from "..";

interface IUseArrowProps extends IItemProps {}

export function useArrow({
	searchTerm,
	item,
	energySensorFilter,
}: IUseArrowProps) {
	const [open, setOpen] = useState(
		Boolean(searchTerm.length) || energySensorFilter,
	);

	function renderArrow() {
		return open ? <ChevronDown size={18} /> : <ChevronUp size={18} />;
	}

	const shouldRenderArrow = item.children.length > 0;

	return { renderArrow, setOpen, open, shouldRenderArrow };
}

import type { INestAsset } from "@/@core/domain/application/usecases/list-assets-tree.usecase";
import type React from "react";

interface IComponentPreviewProps {
	component: INestAsset;
}

const ComponentPreview: React.FC<IComponentPreviewProps> = ({ component }) => {
	return (
		<div className=" border-[1px] border-gray-200 roudned-sm w-full ">
			<span className="border-gray-200 border-b-[1px] w-full block p-2  text-lg font-semibold">
				{component.name} - {component.status}
			</span>
		</div>
	);
};

export { ComponentPreview };

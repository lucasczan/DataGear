import type { INestAsset } from "@/@core/domain/application/usecases/list-assets-tree.usecase";
import { Status } from "@/components/Status";
import { Radio, RadioReceiver } from "lucide-react";
import type React from "react";

interface IComponentPreviewProps {
	component: INestAsset;
}

type statusColor = {
	operating: "green";
	alert: "red";
};

const ComponentPreview: React.FC<IComponentPreviewProps> = ({ component }) => {
	const statusColor: statusColor = {
		operating: "green",
		alert: "red",
	};

	return (
		<div className=" border-[1px] border-gray-200 roudned-sm w-full ">
			<span className="border-gray-200 border-b-[1px] w-full  p-3 text-lg font-semibold flex items-center gap-2">
				{component.name}
				{component.status && <Status color={statusColor[component.status]} />}
			</span>
			<div className="p-6">
				<div className="flex flex-col md:flex-row gap-6 items-center ">
					<img src="/motor.png" alt="imagem do ativo" />
					<div className="flex gap-4 flex-col w-full ">
						<div className="h-fit flex flex-col gap-2 pb-4">
							<span className="font-semibold">Tipo de Equipamento</span>
							<span className="text-gray-400">Motor trifásico</span>
						</div>
						<hr />
						<div className="h-fit flex flex-col gap-2 pb-4 mt-2">
							<span>Responsáveis</span>
							<span className="flex gap-2">
								<span className="h-4 w-4 bg-blue-500 text-white rounded-full flex items-center justify-center p-3">
									E
								</span>
								<span className="text-gray-400">Elétrica</span>
							</span>
						</div>
					</div>
				</div>
				<hr className="my-6" />
				<div className="flex">
					<div className="flex flex-col w-[50%] gap-2">
						<span className="font-semibold">Sensor</span>
						<span className="flex gap-2 items-center">
							<Radio size={18} className="text-blue-500" />
							<span className="text-gray-400">{component?.sensorId}</span>
						</span>
					</div>
					<div className="flex flex-col w-[50%] gap-2">
						<span className="font-semibold">Receptor</span>
						<span className="flex gap-2 items-center">
							<RadioReceiver size={18} className="text-blue-500" />
							<span className="text-gray-400">{component?.gatewayId}</span>
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export { ComponentPreview };

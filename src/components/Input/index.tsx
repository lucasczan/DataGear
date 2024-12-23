import { LoaderCircle } from "lucide-react";
import type React from "react";
import { forwardRef, type InputHTMLAttributes } from "react";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
	endIcon: React.ReactNode;
	isLoading: boolean;
	ref: React.Ref<HTMLInputElement>;
}

export const Input: React.FC<IInputProps> = forwardRef(
	({ endIcon, isLoading, ...rest }, ref) => {
		return (
			<div className="border-b-[1px] border-gray-200 p-3 flex items-center">
				<input ref={ref} {...rest} className="w-full outline-none" />
				{isLoading && (
					<LoaderCircle size={18} className="animate-spin text-gray-600" />
				)}
				{endIcon && !isLoading && endIcon}
			</div>
		);
	},
);

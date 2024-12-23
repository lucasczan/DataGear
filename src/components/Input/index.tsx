import type React from "react";
import { forwardRef, type InputHTMLAttributes, type Ref } from "react";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
	endIcon: React.ReactNode;
	ref: React.Ref<HTMLInputElement>;
}

export const Input: React.FC<IInputProps> = forwardRef(
	({ endIcon, ...rest }, ref) => {
		return (
			<div className="border-b-[1px] border-gray-200 p-3 flex items-center">
				<input ref={ref} {...rest} className="w-full" />
				{endIcon && endIcon}
			</div>
		);
	},
);

import type React from "react";
import * as S from "./styles";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "outlined" | "secondary";
}

export const Button: React.FC<IButtonProps> = ({
	variant,
	children,
	...props
}) => {
	return (
		<button {...props} className={S.button({ variant })}>
			{children}
		</button>
	);
};

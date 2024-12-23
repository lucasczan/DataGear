import { tv } from "tailwind-variants";

export const StatusBullet = tv({
	base: "rounded-full w-2 h-2 block",
	variants: {
		color: {
			green: "bg-green-500",
			red: "bg-red-500",
		},
	},
});

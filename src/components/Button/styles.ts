import { tv } from "tailwind-variants";

const button = tv({
	base: "bg-blue-900 rounded-sm px-[8px] tex-xs flex  gap-1 items-center justify-center text-white",
	variants: {
		variant: {
			primary: "bg-blue-500 ",
			secondary: "bg-blue-900 ",
			outlined: "bg-white ",
		},
	},
});

export { button };

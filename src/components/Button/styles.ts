import { tv } from "tailwind-variants";

const button = tv({
	base: "bg-blue-900 rounded-sm px-2 tex-xs flex  gap-1 items-center justify-center text-white py-[2px] border-[1px] ",
	variants: {
		variant: {
			primary: "bg-blue-500 border-blue-500 ",
			secondary: "bg-blue-900 border-blue-900",
			outlined: "bg-white text-gray-500 border-gray-300 border-[1px]",
		},
	},
});

export { button };

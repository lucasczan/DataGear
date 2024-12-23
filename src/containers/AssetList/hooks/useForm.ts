import { useForm as useReactHookForm } from "react-hook-form";

export const useForm = () => {
	const form = useReactHookForm({
		defaultValues: {
			name: "",
		},
	});

	const nameValue = form.watch("name");
	return { ...form, nameValue };
};

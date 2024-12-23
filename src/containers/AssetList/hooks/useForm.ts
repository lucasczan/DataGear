import { useForm as useReactHookForm } from "react-hook-form";
import { useState, useEffect } from "react";

export const useForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [debouncedName, setDebouncedName] = useState("");

	const form = useReactHookForm({
		defaultValues: {
			name: "",
		},
	});

	const nameValue = form.watch("name");

	useEffect(() => {
		if (nameValue) setIsLoading(true);
		const timeout = setTimeout(() => {
			setDebouncedName(nameValue);
			setIsLoading(false);
		}, 500);

		return () => {
			clearTimeout(timeout);
		};
	}, [nameValue]);

	return { ...form, nameValue: debouncedName, isLoading };
};

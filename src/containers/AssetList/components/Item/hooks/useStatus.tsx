export function useStatus() {
	function renderStatus(status: string | null) {
		if (!status) return;
		const color =
			status === "operating"
				? "bg-green-500 rounded-full w-2 h-2"
				: "bg-red-500 rounded-full w-2 h-2";
		return <span className={color} />;
	}

	return { renderStatus };
}

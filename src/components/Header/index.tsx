import type React from "react";
import { Companies } from "@/containers/Companies";

const Header: React.FC = () => {
	return (
		<header className="bg-blue-700 gap-4 h-min-12 flex items-center justify-between px-4 py-3 fixed w-full top-0 flex-col md:flex-row">
			<img src="/logo.png" alt="logotipo" />
			<Companies />
		</header>
	);
};

export { Header };

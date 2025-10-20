import { ReactNode } from "react";
import Navbar from "@/components/ui/Navbar";

const Layout = ({ children }: Readonly<{ children: ReactNode }>) => {
	return (
		<main className="font-work-sans">
			<Navbar />
			{children}
		</main>
	);
};
export default Layout;

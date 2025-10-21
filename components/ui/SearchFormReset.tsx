"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { Animate } from "./Motion";

const SearchFormReset = () => {
	const reset = () => {
		const form = document.querySelector(".search-form") as HTMLFormElement;
		form.reset();
	};

	return (
		<>
			{" "}
			<button type="reset" onClick={reset}>
				<Animate>
					<Link href="/" className="search-btn text-white">
						<X className="size-5" />
					</Link>
				</Animate>
			</button>
		</>
	);
};

export default SearchFormReset;

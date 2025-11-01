"use client";
import React from "react";
import SearchFormReset from "./SearchFormReset";
import { Search } from "lucide-react";
import { Animate } from "./ui/Motion";

const SearchForm = ({ query }: { query?: string }) => {
	return (
		<search className="w-6/12 m-auto">
			<Animate iy={-50} d={1}>
				<form action="/" className="search-form">
					<input name="query" className="search-input" placeholder="Search Projects by title, author, category, etc." defaultValue={query} />
					<div className="flex gap-2">
						{query && <SearchFormReset />}
						<button type="submit" className="search-btn text-white">
							<Search className="size-5" />
						</button>
					</div>
				</form>
			</Animate>
		</search>
	);
};

export default SearchForm;

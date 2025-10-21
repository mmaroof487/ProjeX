import { defineQuery } from "next-sanity";

export const getProjects = defineQuery(
	`*[_type == "project" && defined(slug.current) && !defined($search) ||
		category match $search || title match $search || author->name match $search ] | order(_createdAt desc) {
		_id,
		title,
		slug,
		author->{
			name,
			image,
			_id
		},
		views,
		description,
		category,
		image,
		pitch,
		_createdAt
	}`
);

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
		_createdAt
	}`
);

export const getProjectById = defineQuery(
	`*[_type == "project" && _id == $id][0] {
		_id,
		title,
		slug,
		author->{
			name,
			image,
			_id,
			username
		},
		views,
		description,
		category,
		image,
		pitch,
		_createdAt,
		}`
);

export const getViews = defineQuery(`*[_type == "project" && _id == $id][0]{
  _id,
  views
}`);

export const getAuthorByGithubId = defineQuery(`
*[_type == "author" && githubId == $id][0]{
  _id,
  id,
  name,
  username,
  email,
  image,
  bio
}
`);

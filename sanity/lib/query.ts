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

export const getAuthorByGithubId = `
  *[_type == "author" && id == $id][0]{
    _id,
    id,
    name,
    username,
    email,
    image,
    bio
  }
`;

export const getAuthorById = defineQuery(`
*[_type == "author" && _id == $id][0]{
    _id,
    id,
    name,
    username,
    email,
    image,
    bio
}
`);

export const getProjectsByAuthor = defineQuery(`*[_type == "project" && author._ref == $id] | order(_createdAt desc) {
  _id,
  title,
  slug,
  _createdAt,
  author -> {
    _id, name, image, bio
  },
  views,
  description,
  category,
  image,
}`);

export const getProjectBySlug = defineQuery(`*[_type == "playlist" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  select[]->{
    _id,
    _createdAt,
    title,
    slug,
    author->{
      _id,
      name,
      slug,
      image,
      bio
    },
    views,
    description,
    category,
    image,
    pitch
  }
}`);

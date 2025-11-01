import { User } from "lucide-react";
import { defineField, defineType } from "sanity";

export const author = defineType({
	name: "author",
	title: "Author",
	type: "document",
	icon: User,
	fields: [
		defineField({
			name: "id",
			type: "string",
			title: "GitHub ID",
		}),
		defineField({
			name: "name",
			type: "string",
		}),
		defineField({
			name: "username",
			type: "string",
		}),
		defineField({
			name: "email",
			type: "string",
		}),
		defineField({
			name: "image",
			type: "url",
		}),
		defineField({
			name: "bio",
			type: "text",
		}),
	],
	preview: {
		select: {
			title: "name",
		},
	},
});

import { User } from "lucide-react";
import { defineField, defineType } from "sanity";

export const project = defineType({
	name: "project",
	title: "Project",
	type: "document",
	icon: User,
	fields: [
		defineField({
			name: "title",
			type: "string",
		}),
		defineField({
			name: "slug",
			type: "slug",
			options: {
				source: "title",
			},
		}),
		defineField({
			name: "author",
			type: "reference",
			to: [{ type: "author" }],
		}),
		defineField({
			name: "views",
			type: "number",
		}),
		defineField({
			name: "description",
			type: "text",
		}),
		defineField({
			name: "category",
			type: "string",
			validation: (Rule) => Rule.min(1).max(20).required().error("Please enter a category"),
		}),
		defineField({
			name: "image",
			type: "url", //!change to image later
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "pitch",
			type: "markdown",
		}),
	],
});

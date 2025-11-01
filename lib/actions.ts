"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "@/lib/utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";

export const createPitch = async (state: FormData, form: FormData, pitch: string) => {
	const session = await auth();
	console.log(session);
	if (!session)
		return parseServerActionResponse({
			error: "Not signed in",
			status: "ERROR",
		});

	const { title, description, category, link } = Object.fromEntries(Array.from(form).filter(([key]) => key !== "pitch"));

	const slug = slugify(title as string, { lower: true, strict: true });

	try {
		const project = {
			title,
			description,
			category,
			image: link,
			slug: {
				_type: "slug",
				current: slug,
			},
			author: {
				_type: "reference",
				_ref: session?.user?.id, // should now contain the Sanity _id
			},
			pitch,
		};
		const result = await writeClient.create({ _type: "project", ...project });

		return parseServerActionResponse({
			...result,
			error: "",
			status: "SUCCESS",
		});
	} catch (error) {
		console.log(error);

		return parseServerActionResponse({
			error: JSON.stringify(error),
			status: "ERROR",
		});
	}
};

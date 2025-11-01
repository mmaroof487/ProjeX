import { client } from "@/sanity/lib/client";
import { getProjectBySlug } from "@/sanity/lib/query";
import React from "react";
import ProjectCard, { ProjectTypeCard } from "./ProjectCard";

const PlaylistProjects = async () => {
	const { select: editorPosts } = await client.fetch(getProjectBySlug, { slug: `editor-picks` });
	return (
		<section className="pb-8">
			<hr className="divider" />
			{editorPosts?.length > 0 && (
				<div className="max-w-4xl mx-auto">
					<p className="text-30-semibold">Editor Picks</p>

					<ul className="mt-7 card_grid-sm">
						{editorPosts.map((post: ProjectTypeCard, i: number) => (
							<ProjectCard key={i} post={post} />
						))}
					</ul>
				</div>
			)}
		</section>
	);
};

export default PlaylistProjects;

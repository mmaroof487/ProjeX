import React from "react";
import { client } from "@/sanity/lib/client";
import { getProjectsByAuthor } from "@/sanity/lib/query";
import ProjectCard, { ProjectTypeCard } from "@/components/ProjectCard";

const UserProjects = async ({ id }: { id: string }) => {
	const projects = await client.fetch(getProjectsByAuthor, { id });

	return <>{projects.length > 0 ? projects.map((project: ProjectTypeCard) => <ProjectCard key={project._id} post={project} />) : <p className="no-result">No posts yet</p>}</>;
};
export default UserProjects;

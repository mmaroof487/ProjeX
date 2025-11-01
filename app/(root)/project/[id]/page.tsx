import React, { Suspense } from "react";
import { client } from "@/sanity/lib/client";
import { getProjectById } from "@/sanity/lib/query";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import markdownit from "markdown-it";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";
import { Animate } from "@/components/ui/Motion";
import PlaylistProjects from "@/components/PlaylistProjects";

const md = markdownit();

const Project = async ({ params }: { params: Promise<{ id: string }> }) => {
	const { id } = await params;
	const project = await client.fetch(getProjectById, { id });
	if (!project) return notFound();
	const parsedContent = md.render(project.pitch || "");

	return (
		<>
			<section className="pink_container !min-h-[230px]">
				<Animate iy={50}>
					<p className="tag">{new Date(project?._createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
				</Animate>
				<Animate iy={-50}>
					<h1 className="heading">{project?.title}</h1>
					<p className="sub-heading !max-w-5xl">{project?.description}</p>
				</Animate>
			</section>
			<Animate>
				<section className="section_container_project px-8">
					<Image
						src={typeof project.image === "string" ? project.image : "/placeholder.png"}
						alt={project?.title ?? "project image"}
						width={800}
						height={0}
						sizes="(max-width: 768px) 100vw, 50vw"
						className="rounded-sm drop-shadow-lg object-contain"
						style={{ maxHeight: "55vh" }} // Add this for extra safety
					/>

					<div className="space-y-5 mt-10 max-w-1/2 mx-auto">
						<div className="flex-between gap-5">
							<Link href={`/user/${project?.author?._id}`} className="flex gap-2 items-center mb-3">
								<Image
									src={typeof project?.author?.image === "string" ? project?.author?.image : "/placeholder.png"}
									alt={project?.author?.name ?? "project image"}
									width={64}
									height={64}
									className="rounded-full drop-shadow-lg"
								/>

								<div>
									<p className="text-20-medium">{project?.author?.name}</p>
									<p className="text-16-medium !text-black-300">@{project?.author?.username}</p>
								</div>
							</Link>

							<p className="category-tag">{project.category}</p>
						</div>

						<h3 className="text-30-bold">Pitch Details</h3>
						{parsedContent ? <article className="prose max-w-4xl font-work-sans break-all" dangerouslySetInnerHTML={{ __html: parsedContent }} /> : <p className="no-result">No details provided</p>}
					</div>
				</section>

				<PlaylistProjects />

				<Suspense fallback={<Skeleton className="view_skeleton" />}>
					<View id={id} />
				</Suspense>
			</Animate>
		</>
	);
};

export default Project;

"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { Eye } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Author, Project } from "@/sanity/types";
import { Animate } from "./ui/Motion";
import { Skeleton } from "./ui/skeleton";

export type ProjectTypeCard = Omit<Project, "author"> & { author?: Author };

const ProjectCard = ({ post }: { post: ProjectTypeCard }) => {
	const { author, title, _createdAt, views, category, _id, image, description } = post;

	return (
		<Animate d={2}>
			<li className="startup-card group">
				<div className="flex-between">
					<p className="startup_card_date">{new Date(_createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
					<div className="flex gap 1.5">
						<Eye className="size=5" /> <span className="text-16-medium">{views}</span>
					</div>
				</div>
				<div className="flex-between mt-5 gap-5">
					<div className="flex-1">
						<Link href={`/user/${author?._id}`}>
							<p className="text-16-medium line-clamp-1">{author?.name}</p>
						</Link>
						<Link href={`/project/${_id}`}>
							<h3 className="text-26-semibold line-clamp-1">{title}</h3>
						</Link>
					</div>
					<Link href={`/user/${author?._id}`}>{/* <Image src={author?.image?.asset?._ref} alt={author?.name} width={48} height={48} className="rounded-all w-auto h-auto" /> */}</Link>
				</div>
				<Link href={`/project/${_id}`}>
					<p className="startup-card-sec">
						{description?.slice(0, 90)} <span className="text-gray-500">.....Read more</span>
					</p>
					{image ? (
						<Image src={typeof image === "string" ? image : "/placeholder.png"} alt={title ?? "project image"} className="startup-card_img w-auto h-auto" width={200} height={400} />
					) : (
						<div className="startup-card_img w-[200px] h-[400px] bg-gray-100 flex items-center justify-center text-sm text-gray-500">No image</div>
					)}
				</Link>
				<div className="flex  justify-between mt-5 ">
					<Link href={`/?query=${category?.toLowerCase()}`}>
						<p className="text-16-medium">{category}</p>
					</Link>
					<button className="startup-card_btn">
						<Link href={`/project/${_id}`}>Details</Link>
					</button>
				</div>
			</li>
		</Animate>
	);
};

export const ProjectCardSkeleton = () => (
	<>
		{[0, 1, 2, 3, 4].map((index: number) => (
			<li key={cn("skeleton", index)}>
				<Skeleton className="startup-card_skeleton" />
			</li>
		))}
	</>
);

export default ProjectCard;

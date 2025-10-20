import React from "react";
import { Eye } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { StartupTypeCard } from "@/lib/type";

const StartupCard = ({ post }: { post: StartupTypeCard }) => {
	const {
		author: { _id: authorId, name },
		title,
		createdAt,
		views,
		category,
		_id,
		image,
		description,
	} = post;
	return (
		<li className="startup-card group">
			<div className="flex-between">
				<p className="startup_card_date">{createdAt}</p>
				<div className="flex gap 1.5">
					<Eye className="size=5" /> <span className="text-16-medium">{views}</span>
				</div>
			</div>
			<div className="flex-between mt-5 gap-5">
				<div className="flex-1">
					<Link href={`/user/${authorId}`}>
						<p className="text-16-medium line-clamp-1">{name}</p>
					</Link>
					<Link href={`/startup/${_id}`}>
						<h3 className="text-26-semibold line-clamp-1">{title}</h3>
					</Link>
				</div>
				<Link href={`/user/${authorId}`}>
					<Image src={image} alt={name} width={48} height={48} className="rounded-all w-auto h-auto" />
				</Link>
			</div>
			<Link href={`/startup/${_id}`}>
				<p className="startup-card-sec">{description}</p>
				<Image src={image} alt="placeholder" className="startup-card_img w-auto h-auto" width={200} height={400} />
			</Link>
			<div className="flex-between-gap-3 mt-5">
				<Link href={`/?query=${category.toLowerCase()}`}>
					<p className="text-16-medium">{category}</p>
				</Link>
				<button className="starup-card-btn">
					<Link href={`/startup/_id`}>Details</Link>
				</button>
			</div>
		</li>
	);
};

export default StartupCard;

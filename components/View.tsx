import React from "react";
import { getViews } from "@/sanity/lib/query";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-client";

//Views will update everytime there is a change
async function incrementViews(id: string, currentViews: number) {
	try {
		await writeClient
			.patch(id)
			.set({ views: currentViews + 1 })
			.commit();
	} catch (err) {
		console.error("Failed to increment views:", err);
	}
}

const View = async ({ id }: { id: string }) => {
	const { views: totalViews } = await client.withConfig({ useCdn: false }).fetch(getViews, { id });

	incrementViews(id, totalViews).catch(console.error);

	return (
		<div className="view-container">
			<div className="absolute -top-2 -right-2">
				<div className="relative">
					<div className="absolute -left-3 top-1">
						<span className="flex size-[11px]">
							<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
							<span className="relative inline-flex size-[11px] rounded-full bg-primary"></span>
						</span>
					</div>
				</div>
			</div>
			<p className="view-text">
				<span className="font-semibold">
					{totalViews} {totalViews > 1 ? `View` : `Views`}
				</span>
			</p>
		</div>
	);
};

export default View;

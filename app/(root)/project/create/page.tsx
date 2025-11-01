import ProjectForm from "@/components/ProjectForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Animate } from "@/components/ui/Motion";

const Page = async () => {
	const session = await auth();

	if (!session) redirect("/");

	return (
		<>
			<section className="pink_container !min-h-[230px]">
				<Animate iy={50} d={1}>
					<h1 className="heading">Submit Your Project</h1>
				</Animate>
				<Animate iy={-50} d={1}>
					<p className="sub-heading !max-w-3xl m-auto">Be short and precise to catch more attention</p>
				</Animate>
			</section>

			<ProjectForm />
		</>
	);
};

export default Page;

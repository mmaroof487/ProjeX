import SearchForm from "@/components/SearchForm";
import { getProjects } from "@/sanity/lib/query";
import ProjectCard, { ProjectTypeCard } from "@/components/ProjectCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { Animate } from "@/components/ui/Motion";
import PlaylistProjects from "@/components/PlaylistProjects";

const Home = async ({ searchParams }: { searchParams: { query?: string } }) => {
	const query = (await searchParams)?.query ?? "";
	const params = { search: query || null };
	const { data: posts } = await sanityFetch({ query: getProjects, params });
	return (
		<>
			<section className="pink_container">
				<Animate iy={50}>
					<h1 className="heading">
						Pitch Your Project <br /> Connect with people that want to collab!
					</h1>
					<p className="sub-heading !max-w-3xl m-auto">Submit your project, Get feedback, and find collaborators!</p>
				</Animate>
				<SearchForm query={query} />
			</section>
			<section className="section_container">
				<Animate d={2}>{query ? <p className="text-30-semibold">Search result for {query}</p> : <p className="text-30-semibold">All Projects</p>}</Animate>
				<ul className="mt-2 card_grid ">{posts?.length > 0 ? posts.map((post: ProjectTypeCard) => <ProjectCard key={post._id} post={post} />) : <p className="no-results">No results found</p>}</ul>
			</section>
			<SanityLive />
			<PlaylistProjects/>
		</>
	);
};

export default Home;

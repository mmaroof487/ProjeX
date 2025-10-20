import SearchForm from "@/components/ui/SearchForm";
import StartupCard from "@/components/ui/StartupCard";
import { StartupTypeCard } from "@/lib/type";

const Home = async ({ searchParams }: { searchParams: { query?: string } }) => {
	const query = (await searchParams?.query) ?? "";
	const posts: StartupTypeCard[] = [
		{
			createdAt: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
			views: 55,
			author: { _id: 1, name: "Muaz", image: "https://picsum.photos/200" },
			_id: 1,
			description: "this is a test",
			category: "test",
			title: "test project",
			image: "https://picsum.photos/200/300",
		},
	];
	return (
		<>
			<section className="pink_container">
				<h1 className="heading">
					Pitch Your Project <br /> Connect with people that want to collab!
				</h1>
				<p className="sub-heading !max-w-3xl">Submit your project, Get feedback, and find collaborators!</p>

				<SearchForm query={query} />
			</section>
			<section className="section_container">
				<p className="text-30-semibold">{query ? `Search result for ${query}` : "All Projects"}</p>
				<ul className="mt-2 card-grid ">{posts?.length > 0 ? posts.map((post: StartupTypeCard) => <StartupCard key={post._id} post={post} />) : <p className="no-results">No results found</p>}</ul>
			</section>
		</>
	);
};

export default Home;

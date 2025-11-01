import React from "react";
import Link from "next/link";
import { auth, signIn, signOut } from "@/auth";
import { Animate } from "./ui/Motion";
import Image from "next/image";
import { BadgePlus, LogOut } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

const Navbar = async () => {
	const session = await auth();
	return (
		<div className="px-5 py-3 bg-white font-work-sans ">
			<nav className="flex justify-between items-center">
				<Animate ix={50}>
					<Link href="/">
						<Image src="/logo.png" alt="Logo" width={144} height={30} className="w-auto h-auto" />
					</Link>
				</Animate>
				<Animate ix={-50}>
					<div className="text-black font-bold  text-lg ">
						{session && session?.user ? (
							<nav className="flex flex-row gap-5 items-center">
								<Link href="/project/create">
									<span className=" hover:text-pinkprimary transition-all duration-500 max-sm:hidden">Create</span>
									<BadgePlus className="size-6 sm:hidden" />
								</Link>
								<form
									action={async () => {
										"use server";

										await signOut({ redirectTo: "/" });
									}}>
									<button type="submit" className="flex justify-center">
										<span className=" hover:text-pinkprimary transition-all duration-500 max-sm:hidden">Logout</span>
										<LogOut className="size-6 sm:hidden text-red-500" />
									</button>
								</form>
								<Link href={`/user/${session?.id}`}>
									<span className="flex flex-row items-center gap-2">
										<span className=" hover:text-primary transition-all duration-500 max-sm:hidden">{session?.user?.name}</span>
										<Avatar className="size-10">
											<AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || ""} />
											<AvatarFallback>AV</AvatarFallback>
										</Avatar>
									</span>
								</Link>
							</nav>
						) : (
							<>
								<form
									action={async () => {
										"use server";
										await signIn("github");
									}}>
									<button type="submit" className="cursor-pointer font-bold  hover:text-pinkprimary transition-all duration-500 text-xl">
										Sign In
									</button>
								</form>
							</>
						)}
					</div>
				</Animate>
			</nav>
		</div>
	);
};

export default Navbar;

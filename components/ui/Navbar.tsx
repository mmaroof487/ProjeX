import React from "react";
import Link from "next/link";
import { auth, signIn, signOut } from "@/auth";
import { Animate } from "./Motion";
import Image from "next/image";

const Navbar = async () => {
	const session = await auth();
	return (
		<div className="px-5 py-3 bg-white font-work-sans ">
			<nav className="flex justify-between items-center">
				<Animate ix={50} d={1}>
					<Link href="/">
						<Image src="/logo.png" alt="Logo" width={144} height={30} className="w-auto h-auto" />
					</Link>
				</Animate>
				<Animate ix={-50} d={1}>
					<div className="text-black font-bold  text-lg ">
						{session && session?.user ? (
							<nav className="flex flex-row gap-5">
								<Link href="/project/create">
									<span className=" hover:text-pinkprimary transition-all duration-500">Create</span>
								</Link>
								<form
									action={async () => {
										"use server";
										await signOut({ redirectTo: "/" });
									}}>
									<button type="submit" className="cursor-pointer  hover:text-pinkprimary transition-all duration-500">
										<span>Sign Out</span>
									</button>
								</form>
								<Link href={`/user/${session?.user?.id}`}>
									<span className=" hover:text-primary-100 transition-all duration-500">{session?.user?.name}</span>
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

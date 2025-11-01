import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { client } from "./sanity/lib/client";
import { getAuthorByGithubId } from "./sanity/lib/query";
import { writeClient } from "./sanity/lib/write-client";

/* eslint-disable @typescript-eslint/no-explicit-any */

const _NextAuth = NextAuth as unknown as (config: any) => any;

export const { handlers, auth, signIn, signOut } = _NextAuth({
	providers: [GitHub],
	callbacks: {
		async signIn({ user, profile }) {
			const name = user?.name ?? null;
			const email = user?.email ?? null;
			const image = user?.image ?? null;
			const githubId = String(profile?.id ?? "");
			const login = profile?.login ?? null;
			const bio = profile?.bio ?? null;

			if (!githubId) return false;

			const existingUser = await client.withConfig({ useCdn: false }).fetch(getAuthorByGithubId, { id: githubId });

			if (!existingUser) {
				await writeClient.create({
					_type: "author",
					name,
					username: login,
					email,
					bio,
					image,
					id: githubId, // store as string
				});
			}

			return true;
		},

		async jwt({ token, account, profile }) {
			if (account && profile) {
				const githubId = String(profile.id); // ensure string
				const user = await client.withConfig({ useCdn: false }).fetch(getAuthorByGithubId, { id: githubId });

				console.log("JWT fetched user:", user); // 🧩 log this to confirm
				token.id = user?._id || null;
			}
			return token;
		},

		async session({ session, token }) {
			if (session?.user) session.user.id = token.id;
			return session;
		},
	},
});

import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { client } from "./sanity/lib/client";
import { getAuthorByGithubId } from "./sanity/lib/query";
import { writeClient } from "./sanity/lib/write-client";

export const { handlers, auth, signIn, signOut } = NextAuth({
	providers: [GitHub],
	callbacks: {
		async signIn({ user: { name, email, image }, profile: { id, login, bio } }) {
			const existingUser = await client.withConfig({ useCdn: false }).fetch(getAuthorByGithubId, { id });
			if (!existingUser) {
				await writeClient.create({
					_type: "author",
					_id: `github-${id}`,
					name,
					username: login,
					email,
					bio,
					image,
					githubId: id,
				});
			}
			return true;
		},

		async jwt({ token, account, profile }) {
			if (account && profile) {
				const user = await client.withConfig({ useCdn: false }).fetch(getAuthorByGithubId, { id: profile.id });
				token.id = user?._id;
			}
			return token;
		},

		async session({ session, token }) {
			session.user.id = token.id;
			return session;
		},
	},
});

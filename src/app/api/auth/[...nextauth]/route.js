import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import connect from "@/utils/database";
import userModel from "@/models/Usermodel";

const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            async authorize(credentials, req) {
                const { email, password } = credentials;

                try {
                    await connect();
                    if (!password || !email)
                        throw new Error("not an valid email or password");
                    const user = await userModel.findOne({ email });
                    if (user == null) {
                        throw new Error("User is not exists");
                    }

                    const passwordMatch = await bcrypt.compare(
                        password,
                        user.password,
                    );
                    if (!passwordMatch)
                        throw new Error("Password dosn't match");

                    return user;
                } catch (error) {
                    console.log("Error occured", error);
                }
            },
        }),

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    session: {
        strateg: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async signIn({ user, account }) {
            if (account.provider === "google") {
                const { name, email } = user;

                try {
                    await connect();
                    const isUserExists = await userModel.findOne({
                        email,
                        iscredential: false,
                    });
                    if (!isUserExists) {
                        const res = await userModel.create({ name, email });
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            return user;
        },

        jwt({ token, user }) {
            if (user) token.role = user.role;
            return token;
        },
        session({ session, token }) {
            session.user.role = token.role;
            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

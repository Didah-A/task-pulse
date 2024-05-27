import clientPromise from "@/lib/mongoDBadapter";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authOptions: AuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
};

export default authOptions;

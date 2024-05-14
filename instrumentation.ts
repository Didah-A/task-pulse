import dbConnect from "./lib/database";

export async function register() {
  await dbConnect();
}

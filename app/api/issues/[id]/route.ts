import Issue from "@/models/issues";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_request: NextRequest, { params }: any) {
  try {
    const issue = await Issue.findById(params.id).populate("creator");
    console.log(issue);
    if (!issue) {
      return NextResponse.json("issue not found", { status: 404 });
    }
    return NextResponse.json(issue, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("oops! someting went worng", { status: 500 });
  }
}

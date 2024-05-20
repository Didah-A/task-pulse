import authOptions from "@/app/auth/authOptions";
import Issue from "@/models/issues";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_request: NextRequest, { params }: any) {
  try {
    const issue = await Issue.findById(params.id).populate("creator");

    if (!issue) {
      return NextResponse.json("issue not found", { status: 404 });
    }
    return NextResponse.json(issue, { status: 200 });
  } catch (error) {
    return NextResponse.json("oops! someting went worng", { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: any) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json("Unauthorised", { status: 401 });
    }
    const body = await request.json();
    const issue = await Issue.findByIdAndUpdate(params.id, {
      title: body.title,
      description: body.description,
      updatedAt: Date.now(),
    });

    if (!issue) {
      return NextResponse.json("Issue not found", { status: 404 });
    }
    return NextResponse.json(issue, { status: 201 });
  } catch (error) {
    return NextResponse.json("something went wrong", { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: any) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json("Unauthorised", { status: 401 });
    }
    await Issue.findByIdAndDelete(params.id);
    return NextResponse.json("Deleted successfully", { status: 200 });
  } catch (error) {
    return NextResponse.json("something went wrong", { status: 400 });
  }
}

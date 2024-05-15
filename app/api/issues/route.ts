import { createIssueSchema } from "@/app/validation/createIssueSchema";
import Issue from "@/models/issues";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = createIssueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, {
      status: 400,
    });
  }

  const issueExists = await Issue.findOne({ title: body.title });

  if (issueExists) {
    return NextResponse.json("Issue already exists", { status: 400 });
  }

  try {
    const newIssue = await Issue.create({
      title: body.title,
      description: body.description,
      creator: {
        name: body.creator.name,
        creatorId: body.creator.creatorId,
      },
      creatorId: body.creatorId,
    });

    return NextResponse.json(newIssue, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const issues = await Issue.find({ "creator.creatorId": "123" });
    return NextResponse.json(issues, { status: 200 });
  } catch (error) {
    return NextResponse.json("An unexpected error has occured!", {
      status: 500,
    });
  }
}

import Issue from "@/models/issues";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const createIssueSchema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().min(5),
  creator: z.object({
    name: z.string().max(255),
    creatorId: z.string(),
  }),
});

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
  return NextResponse.json("hahaha", { status: 200 });
}

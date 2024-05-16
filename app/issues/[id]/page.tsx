"use client";

import IssueStatusBadge from "@/app/components/issueStatusBadge";
import useGetIssueById from "@/hooks/useGetIssueById";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button, Card, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import DeleteIssueButton from "../_components/deleteButton";
import LoadingIssueDetails from "./loading";

interface Props {
  params: { id: string };
}

const IssueDetailsPage = ({ params: { id } }: Props) => {
  const { data: issueDetails, isLoading } = useGetIssueById(id);

  if (isLoading) {
    return <LoadingIssueDetails />;
  }

  if (!issueDetails && !isLoading) notFound();

  return (
    <div className="flex gap-4 flex-col">
      {issueDetails && (
        <>
          <div>
            <Heading>{issueDetails?.title}</Heading>
            <div className="flex gap-8 mt-4 mb-4">
              <IssueStatusBadge status={issueDetails.status} />
              <Text>{new Date(issueDetails?.createdAt!).toDateString()}</Text>
            </div>
            <Card className="prose">
              <ReactMarkdown>{issueDetails.description}</ReactMarkdown>
            </Card>
          </div>
          <div className="flex gap-4">
            <Button>
              <Link
                href={`/issues/${id}/edit`}
                className="flex items-center gap-2"
              >
                <Pencil2Icon /> Edit
              </Link>
            </Button>
            <DeleteIssueButton issueId={issueDetails._id} />
          </div>
        </>
      )}
    </div>
  );
};

export default IssueDetailsPage;

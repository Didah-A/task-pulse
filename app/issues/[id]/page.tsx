"use client";

import IssueStatusBadge from "@/app/components/issueStatusBadge";
import useGetIssueById from "@/app/hooks/useGetIssueById";
import { Card, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

interface Props {
  params: { id: string };
}

const IssueDetailsPage = ({ params: { id } }: Props) => {
  const { data: issueDetails, isLoading } = useGetIssueById(id);

  if (!issueDetails && !isLoading) notFound();

  return (
    <div>
      {issueDetails && (
        <>
          <Heading>{issueDetails?.title}</Heading>
          <div className="flex gap-8 mt-4 mb-4">
            <IssueStatusBadge status={issueDetails.status} />
            <Text>{new Date(issueDetails?.createdAt!).toDateString()}</Text>
          </div>
          <Card className="prose">
            <ReactMarkdown>{issueDetails.description}</ReactMarkdown>
          </Card>
        </>
      )}
    </div>
  );
};

export default IssueDetailsPage;

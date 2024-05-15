"use client";

import useGetIssueById from "@/app/hooks/useGetIssueById";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: { id: string };
}

const IssueDetailsPage = ({ params: { id } }: Props) => {
  console.log(id);
  const { data: issueDetails, isLoading } = useGetIssueById(id);

  if (!issueDetails && !isLoading) notFound();

  return (
    <div>
      {issueDetails && (
        <>
          <p>{issueDetails?.title}</p>
          <p>{issueDetails?.description}</p>
          <p>{issueDetails?.status}</p>
          <p>{new Date(issueDetails?.createdAt!).toDateString()}</p>
        </>
      )}
    </div>
  );
};

export default IssueDetailsPage;

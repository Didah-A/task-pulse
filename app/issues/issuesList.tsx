"use client";

import { Table } from "@radix-ui/themes";
import IssueStatusBadge from "../components/issueStatusBadge";
import useGetIssues from "../../hooks/useGetIssues";
import Link from "../components/link";
import LoadingIssues from "./loading";

const IssuesList = () => {
  const { data: issues, isLoading } = useGetIssues();

  if (isLoading) return <LoadingIssues />;

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className="hidden md:table-cell">
            Status
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className="hidden md:table-cell">
            Created
          </Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues?.map((issue) => (
          <Table.Row key={issue._id}>
            <Table.Cell className="">
              <Link href={`/issues/${issue._id}`}>
                {issue.title}
                <div className="block md:hidden mt-3">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Link>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <IssueStatusBadge status={issue.status} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {new Date(issue.createdAt).toDateString()}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default IssuesList;

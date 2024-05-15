"use client";

import { Table } from "@radix-ui/themes";
import React from "react";
import useGetIssues from "../hooks/useGetIssues";

const IssuesList = () => {
  const { data: issues } = useGetIssues();
  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Created</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues?.map((issue: any) => (
          <Table.Row key={issue.id}>
            <Table.Cell>{issue.title}</Table.Cell>
            <Table.Cell>{issue.status}</Table.Cell>
            <Table.Cell>{issue.createdAt}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default IssuesList;

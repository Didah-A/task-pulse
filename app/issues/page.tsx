import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import IssuesList from "./issuesList";

const IssuesPage = async () => {
  return (
    <div>
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
      <IssuesList />
    </div>
  );
};

export default IssuesPage;

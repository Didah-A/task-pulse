import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import IssuesList from "./issuesList";

const IssuesPage = async () => {
  return (
    <div>
      <div className="mb-4">
        <Button>
          <Link href="/issues/new">New Issue</Link>
        </Button>
      </div>

      <IssuesList />
    </div>
  );
};

export default IssuesPage;

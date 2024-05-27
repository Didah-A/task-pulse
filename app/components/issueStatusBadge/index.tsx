import { Badge } from "@radix-ui/themes";
import React from "react";

interface IStatus {
  status: string;
}

const IssueStatusBadge = ({ status }: IStatus) => {
  const colors: Record<any, { label: string; color: string }> = {
    OPEN: { label: "Open", color: "red" },
    IN_PROGRESS: { label: "In progress", color: "violet" },
    CLOSED: { label: "Closed", color: "green" },
  };
  return (
    <Badge color={colors[status].color as any}>{colors[status].label}</Badge>
  );
};

export default IssueStatusBadge;

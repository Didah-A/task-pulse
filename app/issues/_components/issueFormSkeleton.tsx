import React from "react";
import Skeleton from "@/app/components/skeleton";

const IssueFormSkeleton = () => {
  return (
    <div className="max-w-xl">
      <Skeleton height={"2rem"} />
      <Skeleton height={"20rem"} />
      <Skeleton />
    </div>
  );
};

export default IssueFormSkeleton;

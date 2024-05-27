import React from "react";
import Skeleton from "react-loading-skeleton";

const LoadingIssueDetails = () => {
  return (
    <div className="max-w-xl">
      <Skeleton height={"2rem"} />
      <Skeleton height={"1rem"} />
      <Skeleton height={"4rem"} />
    </div>
  );
};

export default LoadingIssueDetails;

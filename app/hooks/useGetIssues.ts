import { useQuery } from "@tanstack/react-query";
import { findAllIssues } from "../services/issueService";
import { IssueType } from "../types";

export const getIssuesQuery = () => ["issues"];

const useGetIssues = () => {
  const { data, isLoading } = useQuery<IssueType[]>({
    queryKey: ["issues"],
    queryFn: findAllIssues,
  });

  return { data, isLoading };
};

export default useGetIssues;

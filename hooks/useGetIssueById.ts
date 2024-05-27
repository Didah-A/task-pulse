import { useQuery } from "@tanstack/react-query";
import { findAllIssues, findIssueById } from "../services/issueService";
import { IssueType } from "../app/types";

export const getIssuesQuery = () => ["issues"];

const useGetIssueById = (id: string) => {
  const { data, isLoading } = useQuery<IssueType>({
    queryKey: ["issues", id],
    queryFn: () => findIssueById(id),
  });

  return { data, isLoading };
};

export default useGetIssueById;

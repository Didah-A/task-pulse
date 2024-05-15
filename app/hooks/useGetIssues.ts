import { useQuery } from "@tanstack/react-query";
import { findAllIssues } from "../services/issueService";

export const getIssuesQuery = () => ["issues"];

const useGetIssues = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["issues"],
    queryFn: findAllIssues,
  });

  return { data, isLoading };
};

export default useGetIssues;

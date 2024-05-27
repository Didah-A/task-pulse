"use client";
import useGetIssueById from "@/hooks/useGetIssueById";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "../../_components/issueFormSkeleton";

interface IProps {
  params: {
    id: string;
  };
}

const IssueForm = dynamic(() => import("../../_components/issueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

const EditIssuePage = ({ params: { id } }: IProps) => {
  const { data: issue, isLoading } = useGetIssueById(id);

  if (isLoading) return <IssueFormSkeleton />;

  return <div>{!isLoading && <IssueForm issue={issue} />}</div>;
};

export default EditIssuePage;

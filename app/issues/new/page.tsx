import dynamic from "next/dynamic";
import IssueFormSkeleton from "../_components/issueFormSkeleton";

const IssueForm = dynamic(() => import("../_components/issueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

const NewIssuePage = () => {
  return (
    <div>
      <IssueForm />
    </div>
  );
};

export default NewIssuePage;

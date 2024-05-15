export interface IssueType {
  _id: string;
  title: string;
  description: string;
  creator: {
    name: string;
    creatorId: string;
  };
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface ICreateIssueData {
  title: string;
  description: string;
  creator?: {
    name: string;
    creatorId: string;
  };
}

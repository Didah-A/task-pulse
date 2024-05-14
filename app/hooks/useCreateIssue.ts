import axios from "axios";

export interface ICreateIssueData {
  title: string;
  description: string;
  creator?: {
    name: string;
    creatorId: string;
  };
}

export default () => {
  return async (data: ICreateIssueData) =>
    await axios.post("/api/issues", data);
};

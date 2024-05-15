import { apiClient } from "./apiClient";
import { IssueType } from "../app/types";
import { ICreateIssueData } from "../app/types";

export const findAllIssues = async () => {
  const res = await apiClient.get<IssueType[]>("/issues");
  return res.data;
};

export const findIssueById = async (id: string) => {
  const response = await apiClient.get<IssueType>(`/issues/${id}`);
  return response.data;
};

export const createIssue = async (data: ICreateIssueData) => {
  const response = await apiClient.post<IssueType>("/issues", data);
  return response.data;
};

export const updateIssue = async (data: ICreateIssueData) => {
  const response = await apiClient.put<IssueType>("/issues", data);
  return response.data;
};

export const deleteIssue = async (id: string) => {
  const response = await apiClient.delete<any>(`/issues/${id}`);
  return response.data;
};

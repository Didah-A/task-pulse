"use client";
import AlertBox from "@/app/components/alertDialog";
import { deleteIssue } from "@/services/issueService";
import { Button } from "@radix-ui/themes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";

const DeleteIssueButton = ({ issueId }: { issueId: string }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutateAsync: deleteIssueMutation, isPending } = useMutation({
    mutationFn: deleteIssue,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["issues"] });
      router.push("/issues");
    },
  });

  const handeDelete = async () => {
    const issue = await deleteIssueMutation(issueId);
  };

  return (
    <AlertBox
      text={"Are you sure you want to delete this issue?"}
      confirmText="Delete"
      onConfirm={handeDelete}
      title="Delete Issue"
    >
      <Button color="red" disabled={isPending}>
        Delete issue
      </Button>
    </AlertBox>
  );
};

export default DeleteIssueButton;

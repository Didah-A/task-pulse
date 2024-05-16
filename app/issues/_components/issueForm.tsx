"use client";
import CalloutComponent from "@/app/components/callout";
import ErrorDisplay from "@/app/components/errorDisplay";
import LoadingSpinner from "@/app/components/loadingSpinner";
import { ICreateIssueData, IssueType } from "@/app/types";
import { createIssueSchema } from "@/app/validation/createIssueSchema";
import { createIssue, updateIssue } from "@/services/issueService";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField } from "@radix-ui/themes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

interface IProps {
  issue?: IssueType;
}

type IIssueForm = z.infer<typeof createIssueSchema>;

const IssueForm = ({ issue }: IProps) => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { isValid, errors },
  } = useForm<IIssueForm>({
    resolver: zodResolver(createIssueSchema),
  });

  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { mutateAsync: postIssue } = useMutation({
    mutationFn: createIssue,
    onSuccess: () => {
      invalidateQueries();
    },
  });
  const { mutateAsync: update } = useMutation({
    mutationFn: updateIssue,
    onSuccess: () => {
      invalidateQueries();
    },
  });

  const invalidateQueries = () => {
    queryClient.invalidateQueries({ queryKey: ["issues", issue?._id] });
    queryClient.invalidateQueries({ queryKey: ["issues"] });
    router.push("/issues");
  };

  const handleSave = async (data: ICreateIssueData) => {
    setIsSubmitting(true);
    const newData = {
      creator: {
        name: "Didacus",
        creatorId: "123",
      },
      ...data,
    };
    try {
      const issueRes = await (!issue
        ? postIssue(newData)
        : update({ id: issue._id, data: newData }));

      if (!!issueRes._id) {
        setIsSubmitting(false);
        !issue && reset();
      } else {
        setIsSubmitting(false);
      }
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
      setError("An unexpected error occured");
    }
  };

  return (
    <div>
      <div className="max-w-xl mb-4">
        {error && <CalloutComponent text={error} />}
      </div>
      <form
        className="max-w-xl "
        onSubmit={handleSubmit((data) => handleSave(data))}
        onChange={() => setError(null)}
      >
        <TextField.Root
          placeholder="Title"
          {...register("title")}
          className="space-y-4"
          defaultValue={issue?.title || ""}
        />
        {errors.title && <ErrorDisplay error={errors.title.message} />}
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description || ""}
          render={({ field }) => (
            <SimpleMDE
              placeholder="Description"
              {...field}
              className="space-y-4"
            />
          )}
        />
        <Button type="submit" disabled={isSubmitting || !isValid}>
          {issue ? "Update issue" : "Submit new issue"}{" "}
          {isSubmitting && <LoadingSpinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;

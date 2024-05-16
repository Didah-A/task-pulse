"use client";
import CalloutComponent from "@/app/components/callout";
import ErrorDisplay from "@/app/components/errorDisplay";
import LoadingSpinner from "@/app/components/loadingSpinner";
import { ICreateIssueData } from "@/app/types";
import { createIssueSchema } from "@/app/validation/createIssueSchema";
import { createIssue } from "@/services/issueService";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField } from "@radix-ui/themes";
import { useMutation } from "@tanstack/react-query";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type IssueForm = z.infer<typeof createIssueSchema>;

const IssueEdit = () => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { isValid, errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { mutateAsync: postIssue } = useMutation({ mutationFn: createIssue });

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
      const issue = await postIssue(newData);

      if (!!issue._id) {
        setIsSubmitting(false);
        reset();
      } else {
        setIsSubmitting(false);
      }
    } catch (error) {
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
        />
        {errors.title && <ErrorDisplay error={errors.title.message} />}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE
              placeholder="Description"
              {...field}
              className="space-y-4"
            />
          )}
        />
        <Button type="submit" disabled={isSubmitting || !isValid}>
          Submit new issue {isSubmitting && <LoadingSpinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueEdit;

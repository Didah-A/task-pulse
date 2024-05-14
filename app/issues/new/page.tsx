"use client";
import useCreateIssue, { ICreateIssueData } from "@/app/hooks/useCreateIssue";
import { Button, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const { register, control, handleSubmit, reset } = useForm<IssueForm>();
  const [disabled, setDisabled] = useState(false);

  const createIssue = useCreateIssue();

  const handleSave = async (data: ICreateIssueData) => {
    setDisabled(true);
    const newData = {
      creator: {
        name: "Didacus",
        creatorId: "123",
      },
      ...data,
    };
    try {
      const issue = await createIssue(newData);

      if (issue.status === 201) {
        setDisabled(false);
        reset();
      } else {
        setDisabled(false);
      }
    } catch (error) {
      setDisabled(false);
      console.log(error);
    }
  };

  return (
    <form
      className="max-w-xl space-y-4"
      onSubmit={handleSubmit((data) => handleSave(data))}
    >
      <TextField.Root placeholder="Title" {...register("title")} />
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Description" {...field} />
        )}
      />
      <Button type="submit" disabled={disabled}>
        Submit new issue
      </Button>
    </form>
  );
};

export default NewIssuePage;

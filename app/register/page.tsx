"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField } from "@radix-ui/themes";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ErrorDisplay from "../components/errorDisplay";
import LoadingSpinner from "../components/loadingSpinner";
import { userSchemaValidator } from "../validation/userSchemaValidation";
import Link from "next/link";

interface IUser {
  email: string;
  password: string;
  name: string;
}

const Register = () => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { isValid, errors },
  } = useForm<IUser>({
    resolver: zodResolver(userSchemaValidator),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSave = (data: IUser) => {
    //
  };

  return (
    <div>
      <h1 className="mb-4">Register</h1>
      <form
        className="max-w-xl flex flex-col gap-4"
        onSubmit={handleSubmit((data) => handleSave(data))}
        onChange={() => setError(null)}
      >
        <TextField.Root
          placeholder="Name"
          {...register("name")}
          className="space-y-4"
        />
        <TextField.Root
          placeholder="Email"
          {...register("email")}
          className="space-y-4"
        />
        {errors.email && <ErrorDisplay error={errors.email.message} />}
        <TextField.Root
          placeholder="Password"
          {...register("password")}
          className="space-y-4"
          type="password"
        />
        <div>
          <Button
            type="submit"
            disabled={isSubmitting || !isValid}
            className="max-w-1"
          >
            Register
            {isSubmitting && <LoadingSpinner />}
          </Button>
        </div>
      </form>
      <Link href={"/signin"}>Sign in with existing account</Link>
    </div>
  );
};

export default Register;

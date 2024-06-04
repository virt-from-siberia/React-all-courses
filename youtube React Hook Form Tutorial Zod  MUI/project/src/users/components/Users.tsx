import { useState } from "react";
import { useForm } from "react-hook-form";

export const Users = () => {
  const [input, setInput] = useState<string>("");
  const {
    getValues,
    register,
    reset,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    email: string;
  }>({
    mode: "all",
  });

  const onSubmit = () => {
    console.log("onSubmit");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("email", {
          required: { value: true, message: "Please enter email" },
          maxLength: { value: 10, message: "10" },
        })}
        placeholder="Email"
      />
      <p>{errors.email?.message}</p>
    </form>
  );
};

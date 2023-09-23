/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const SCHEMA_VALIDATION = z.object({
  username: z.string().nonempty("Username is required"),
  email: z
    .string()
    .nonempty("Username is required")
    .email("Email format is not valid"),
  channel: z.string().nonempty("Username is required"),
});

type FormValuesType = {
  username: string;
  email: string;
  channel: string;
};

export const ZodValidationForm = () => {
  // default values
  const form = useForm<FormValuesType>({
    defaultValues: {
      username: "",
      email: "",
      channel: "",
    },
    resolver: zodResolver(SCHEMA_VALIDATION),
  });

  const {
    register,
    handleSubmit,
    control,
    formState,

    getValues,
  } = form;

  const { errors } = formState;

  const handleGetValues = () => {
    console.log("Get values", getValues(["social", "channel", "username"]));
  };

  const onSubmit = (data: FormValuesType) => {
    console.log("submitted");
    console.log("Form submited, data", data);
  };

  return (
    <div>
      <h1>ZOD validation Form </h1>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" {...register("username")} />
          <p className="error">{errors.username?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="email">email</label>
          <input type="text" id="email" {...register("email")} />
          <p className="error">{errors.username?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="channel">channel</label>
          <input type="text" id="channel" {...register("channel")} />
          <p className="error">{errors.channel?.message}</p>
        </div>

        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

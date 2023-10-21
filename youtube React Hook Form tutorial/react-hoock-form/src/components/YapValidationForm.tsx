/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const SCHEMA_VALIDATION = yup.object({
  username: yup.string().required("Username is required"),
  email: yup
    .string()
    .email("Email must be a valid email")
    .required("email is required"),
  channel: yup.string().required("channel is required"),
});

type FormValuesType = {
  username: string;
  email: string;
  channel: string;
};

export const YapValidationForm = () => {
  // default values
  const form = useForm<FormValuesType>({
    defaultValues: {
      username: "",
      email: "",
      channel: "",
    },
    resolver: yupResolver(SCHEMA_VALIDATION),
  });

  const { register, handleSubmit, control, formState, getValues } = form;

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
      <h1>YAP validation Form </h1>

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

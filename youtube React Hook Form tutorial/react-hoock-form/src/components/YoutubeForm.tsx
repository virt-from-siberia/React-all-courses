import React from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

let renderCount = 0;

type FormValuesType = {
  username: string;
  email: string;
  channel: string;
  social: {
    twitter: string;
    facebook: string;
  };
};

export const YouTubeForm = () => {
  // default values
  const form = useForm<FormValuesType>({
    defaultValues: {
      username: "Batman",
      email: "",
      channel: "",
      social: {
        twitter: "",
        facebook: "",
      },
    },
  });

  // const form = useForm<FormValuesType>({
  //   defaultValues: async () => {
  //     const response = await fetch(
  //       "https://jsonplaceholder.typicode.com/users/1"
  //     );
  //     const data = await response.json();

  //     return {
  //       username: "Batman",
  //       email: data.email,
  //       channel: "",
  //     };
  //   },
  // });

  const { register, handleSubmit, control, formState } = form;
  const { errors } = formState;

  const onSubmit = (data: FormValuesType) => {
    console.log("Form submited, data", data);
  };

  renderCount++;

  return (
    <div>
      <h1>YouTube Form ({renderCount / 2})</h1>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            {...register("username", {
              required: { message: "Username is required", value: true },
            })}
          />
          <p className="error">{errors.username?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              pattern: {
                value: /^[\w\.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
              required: { message: "Email is required", value: true },
              validate: {
                blackList: (fieldValue) => {
                  return (
                    !fieldValue.endsWith("mail.ru") ||
                    "this domain is not supported"
                  );
                },
              },
            })}
          />
          <p className="error">{errors.email?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input type="text" id="channel" {...register("channel")} />
          <p className="error">{errors.username?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="twitter">Twitter</label>
          <input type="text" id="channel" {...register("social.twitter")} />
        </div>

        <div className="form-control">
          <label htmlFor="facebook">Facebook</label>
          <input type="text" id="channel" {...register("social.facebook")} />
        </div>

        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

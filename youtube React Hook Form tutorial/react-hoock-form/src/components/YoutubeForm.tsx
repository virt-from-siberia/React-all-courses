/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import {
  Controller,
  useForm,
  useFieldArray,
  FieldErrors,
} from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import InputMask from "react-input-mask";

let renderCount = 0;

type FormValuesType = {
  username: string;
  email: string;
  channel: string;
  social: {
    twitter: string;
    facebook: string;
  };
  phoneNumber: string;
  phoneNumbers: string[];
  phNumbers: {
    number: string;
  }[];
  age: number;
  dob: Date;
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
      phoneNumber: "",
      phoneNumbers: ["", ""],
      phNumbers: [
        {
          number: "",
        },
      ],
      age: 0,
      dob: new Date(),
    },
    // Валидация работает если поле затронто
    mode: "onBlur",
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

  const {
    register,
    handleSubmit,
    control,
    formState,
    watch,
    getValues,
    setValue,
    reset,
    trigger,
  } = form;

  const {
    errors,
    touchedFields,
    dirtyFields,
    isDirty,
    isValid,
    isSubmitting,
    isSubmitted,
    isSubmitSuccessful,
    submitCount,
  } = formState;

  const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control,
  });

  console.log("touchedFields", touchedFields);
  console.log("dirtyFields", dirtyFields);
  console.log("isDirty", isDirty);
  console.log("isValid", isValid);

  console.log({ isSubmitting });
  console.log({ isSubmitted });
  console.log({ isSubmitSuccessful });
  console.log({ submitCount });

  const handleGetValues = () => {
    console.log("Get values", getValues(["social", "channel", "username"]));
  };

  const handleSetValues = () => {
    setValue("username", "set username from handleSetValues", {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onError = (error: FieldErrors<FormValuesType>) => {
    console.log("error", error);
  };

  const onSubmit = (data: FormValuesType) => {
    console.log("submitted");
    console.log("Form submited, data", data);
  };

  useEffect(() => {
    const subscription = watch((value) => {
      console.log("value", value);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    // сброс формы после успешной отправки
    if (isSubmitSuccessful) reset();
  }, [reset, isSubmitSuccessful]);

  const watchUsername = watch(["username", "email"]);

  renderCount++;

  return (
    <div>
      <h1>YouTube Form ({renderCount / 2})</h1>
      <h2>Watched value: {watchUsername}</h2>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
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
                emailAvailable: async (fieldValue) => {
                  const response = await fetch(
                    `https://jsonplaceholder.typicode.com/users?email=${fieldValue}`
                  );
                  const data = await response.json();
                  return data.length == 0 || "Email already exists";
                },
              },
            })}
          />
          <p className="error">{errors.email?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            id="channel"
            {...register("channel", {
              required: {
                value: true,
                message: "Channel is required",
              },
            })}
          />
          <p className="error">{errors.channel?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="twitter">Twitter</label>
          <input
            type="text"
            id="twitter"
            {...register("social.twitter", {
              // disabled: watch("channel") === "",
              required: "Enter twitter",
            })}
          />
        </div>

        <div className="form-control">
          <label htmlFor="facebook">Facebook</label>
          <input type="text" id="facebook" {...register("social.facebook")} />
        </div>

        {/* <div className="form-control">
          <label>Phone Number:</label>
          <Controller
            name="phoneNumber"
            control={control}
            defaultValue=""
            rules={{
              required: "Phone Number is required",
            }}
            render={({ field }) => (
              <InputMask
                mask="+7 (999) 999-99-99"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
              >
                {(inputProps: any) => <input type="text" {...inputProps} />}
              </InputMask>
            )}
          />
          {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
        </div> */}

        <div className="form-control">
          <label htmlFor="primary-phone">Primary phone number</label>
          <input
            type="text"
            id="primary-phone"
            {...register("phoneNumbers.0")}
          />
        </div>

        <div className="form-control">
          <label htmlFor="secondary-phone">Secondary phone number</label>
          <input
            type="text"
            id="secondary-phone"
            {...register("phoneNumbers.1")}
          />
        </div>

        <div>
          <label>List of phone numbers</label>
          <div>
            {fields.map((field, index) => (
              <div className="form-control" key={field.id}>
                <input
                  type="text"
                  {...register(`phNumbers.${index}.number` as const)}
                />
                {index > 0 && (
                  <>
                    <button type="button" onClick={() => remove(index)}>
                      Remove
                    </button>
                  </>
                )}
              </div>
            ))}
            <button type="button" onClick={() => append({ number: "" })}>
              Add phone number
            </button>
          </div>
        </div>

        <div className="form-control">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            {...register("age", {
              valueAsNumber: true,
              required: {
                value: true,
                message: "Age is required",
              },
            })}
          />
          <p className="error">{errors.age?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="dob">Channel</label>
          <input
            type="date"
            id="dob"
            {...register("dob", {
              valueAsDate: true,
              required: {
                value: true,
                message: "Date is required",
              },
            })}
          />
          <p className="error">{errors.dob?.message}</p>
        </div>

        <button disabled={!isDirty || !isValid || isSubmitting}>Submit</button>
        <button type="button" onClick={() => reset()}>
          Reset
        </button>
        <button type="button" onClick={handleGetValues}>
          Get values
        </button>
        <button type="button" onClick={handleSetValues}>
          Set values
        </button>
        <button type="button" onClick={() => trigger()}>
          Validate
        </button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Stack, TextField } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";

import { defaultValues, Schema, schema } from "../../users/types/schema";
import { RHFAutocomplete } from "../../components/RHFAutocomplete";
import { RHFToggleButton } from "../../components/RHFToggleButton";
import { RHFRadioGroup } from "../../components/RHFRadioGroup";
import { RHFCheckbox } from "../../components/RHFCheckbox";
import { RHFDateTimePicker } from "../../components/RHFDateTimePicker";

const selectOptions = [
  { id: 1, label: "California" },
  { id: 2, label: "Texas" },
];

const languagesOptions = [
  { id: 1, label: "English" },
  { id: 2, label: "Russian" },
  { id: 3, label: "Germany" },
];

const gendersOptions = [
  { id: 1, label: "Male" },
  { id: 2, label: "Female" },
];

const skillsOptions = [
  { id: 1, label: "PHP" },
  { id: 2, label: "Java" },
  { id: 3, label: "React" },
];

export const Users = () => {
  const {
    register,
    formState: { errors },
    watch,
  } = useForm<Schema>({
    mode: "all",
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  useEffect(() => {
    const sub = watch((value) => {
      console.log("value", value);
    });

    return () => sub.unsubscribe();
  }, [watch]);

  return (
    <Stack sx={{ gap: 2 }}>
      <TextField
        {...register("name")}
        label="name"
        error={!!errors.name}
        helperText={errors.name?.message}
        size="small"
      />
      <TextField
        {...register("email")}
        label="email"
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <RHFAutocomplete<Schema>
        name="states"
        options={selectOptions}
        label={"States"}
      />
      <RHFToggleButton<Schema>
        name="languagesSpoken"
        options={languagesOptions}
      />
      <RHFRadioGroup<Schema>
        name="gender"
        options={gendersOptions}
        label="Gender"
      />
      <RHFCheckbox<Schema>
        name="skills"
        options={skillsOptions}
        label="Skills"
      />
      <RHFDateTimePicker<Schema>
        name="registrationDateAndTime"
        label="Registration Date & Time"
      />
    </Stack>
  );
};

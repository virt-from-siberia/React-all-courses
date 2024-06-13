import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";

import { Option } from "../types/option";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

type Props<T extends FieldValues> = {
  name: Path<T>;
  options?: Option[];
};

export function RHFToggleButton<T extends FieldValues>({
  name,
  options,
}: Props<T>) {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, ...restFiled } }) => (
        <ToggleButtonGroup
          onChange={(_, newValue) => {
            if (newValue.length > 0) {
              onChange(newValue);
            }
          }}
          value={value.length ? value : [options?.[0]?.id]}
        >
          {options?.map((option) => (
            <ToggleButton value={option.id} key={option.id}>
              {option.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      )}
    />
  );
}

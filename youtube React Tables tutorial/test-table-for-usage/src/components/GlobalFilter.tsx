import { useState } from "react";
import { Box, Input } from "@chakra-ui/react";
import { useAsyncDebounce } from "react-table";

interface GlobalFilterProps {
  filter: string;
  setFilter: (filter: string | undefined) => void;
}

export const GlobalFilter: React.FC<GlobalFilterProps> = ({
  filter,
  setFilter,
}) => {
  const [value, setValue] = useState<string>(filter);

  const DEBOUNCE_TIME = 500;

  const onChange = useAsyncDebounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilter(e.target.value || undefined);
    },
    DEBOUNCE_TIME
  );

  return (
    <Box>
      <Input
        placeholder="Поиск:"
        size="xs"
        type="text"
        ml="15px"
        value={value || ""}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setValue(e.target.value);
          onChange(e);
        }}
      />
    </Box>
  );
};

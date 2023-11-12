import { useState } from "react";
import { Input } from "@chakra-ui/react";
import { useAsyncDebounce } from "react-table";

export const GlobalFilter = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter);

  const DEBOUNCE_TIME = 500;

  const onChange = useAsyncDebounce((val) => {
    setFilter(val || undefined);
  }, DEBOUNCE_TIME);

  return (
    <div>
      <Input
        placeholder="Поиск:"
        size="xs"
        type="text"
        ml="15px"
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      />
    </div>
  );
};

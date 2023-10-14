import { Counter } from "entities/Counter";
import { useState } from "react";
import { Input } from "shared/ui/Input/Input";

const MainPage = () => {
  const [value, setValue] = useState<string>("");
  const onChange = (val: " string") => setValue(val);

  return (
    <div>
      MainPage
      <Counter />
      <Input type="text" onChange={onChange} value={value} />
    </div>
  );
};

export default MainPage;

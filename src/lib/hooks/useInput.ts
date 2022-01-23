import { ChangeEvent, useState } from "react";

export const useInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);

  const reset = () => setValue('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.target?.value);
  };
  const bind = {
    value,
    onChange: handleChange,
  }

  return {value, reset, bind};
};
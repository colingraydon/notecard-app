import React, { InputHTMLAttributes } from "react";
import { useField } from "formik";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
} from "@chakra-ui/react";

type InputFieldSelectProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  placeholder: string;
  label: string;
  options: Array<{ name: string; id: number }>;
};

export const InputFieldSelect: React.FC<InputFieldSelectProps> = ({
  label,
  size: _,
  options,
  ...props
}) => {
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Select {...field} id={field.name} placeholder={props.placeholder}>
        {options.map((option) => {
          return (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          );
        })}
      </Select>
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};

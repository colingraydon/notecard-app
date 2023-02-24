import { Box, CircularProgress, Select } from "@chakra-ui/react";
import React, { useState } from "react";
import { useGetSubjectsQuery } from "../generated/graphql";

interface SubjectSelectProps {
  subjects?: Array<{
    name: string;
    id: number;
  }>;
  loading: boolean;
  value: {
    name: string;
    id: number;
  };
  started: boolean;
  handleClick: (item: { name: string; id: number }) => void;
  handleChange: (item: { name: string; id: number }) => void;
}

export const SubjectSelect: React.FC<SubjectSelectProps> = (
  props: SubjectSelectProps
) => {
  const { data, error, loading } = useGetSubjectsQuery();
  const [value, setValue] = useState("chose a subject");
  const subjects = data?.getSubjects;

  return (
    <Box>
      {props.loading ? (
        <CircularProgress isIndeterminate value={50} />
      ) : (
        <React.Fragment>
          <Box w={400}>
            <Select
              isDisabled={props.started}
              placeholder="select a subject"
              onChange={(e) => {
                const subName: string = e.target.value;

                const index = e.target.selectedIndex;
                const optionElement = e.target.children[index];
                const optionElementId: number = parseInt(
                  optionElement.getAttribute("data-id")
                );
                console.log("subName: ", subName);
                console.log("subname type: ", typeof subName);
                if (subName.length > 1) {
                  props.handleChange({ name: subName, id: optionElementId });
                }
              }}
            >
              {props.subjects.map((item) => (
                <option data-id={item.id} value={item.name} key={item.id}>
                  {item.name}
                </option>
              ))}
            </Select>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
};

//newValue => void

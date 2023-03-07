import { Box, CircularProgress, Select } from "@chakra-ui/react";
import React from "react";
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
  startedOnce: boolean;
  handleChange: (item: { name: string; id: number }) => void;
}

export const SubjectSelect: React.FC<SubjectSelectProps> = (
  props: SubjectSelectProps
) => {
  const { data, error, loading } = useGetSubjectsQuery();

  return (
    <Box>
      {props.loading ? (
        <CircularProgress isIndeterminate value={50} />
      ) : (
        <React.Fragment>
          <Box w={280}>
            <Select
              boxShadow="2xl"
              isDisabled={props.started}
              placeholder="select a subject"
              onChange={(e) => {
                const subName: string = e.target.value;

                const index = e.target.selectedIndex;
                const optionElement = e.target.children[index];
                const optionElementId: number = parseInt(
                  optionElement.getAttribute("data-id")
                );

                console.log("index: ", index);
                console.log("optionElement: ", optionElement);
                console.log("SubName:", subName);
                console.log("optionElementId: ", optionElementId);

                if (subName.length > 1) {
                  props.handleChange({ name: subName, id: optionElementId });
                  console.log("change handled");
                }
              }}
            >
              {props.subjects?.map((item) => (
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

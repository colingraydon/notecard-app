import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Subject, useGetSubjectsQuery } from "../generated/graphql";
import { SingleSub } from "../types";

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
  handleClick: (item: { name: string; id: number }) => void;
}

export const SubjectSelect: React.FC<SubjectSelectProps> = (
  props: SubjectSelectProps
) => {
  // const { data, error, loading } = useGetSubjectsQuery();
  // const [value, setValue] = useState("chose a subject");
  // const subjects = data?.getSubjects;

  return (
    <Box>
      {props.loading ? (
        <div>loading...</div>
      ) : (
        <React.Fragment>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              {props.value.name}
            </MenuButton>
            <MenuList h={80} sx={{ overflow: "scroll" }}>
              {props.subjects.map((item, key) => (
                <MenuItem
                  onClick={() => {
                    // console.log("entered onClick");
                    // console.log("item id, name: ", item.id, item.name);
                    // const tempVar: SingleSub = {name: item.name, id: item.id}
                    props.handleClick({ name: item.name, id: item.id });
                  }}
                  key={item.id}
                >
                  {item.name}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </React.Fragment>
      )}
    </Box>
  );
};

//newValue => void

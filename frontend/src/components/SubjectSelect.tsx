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
import { useGetSubjectsQuery } from "../generated/graphql";

interface SubjectSelectProps {}

export const SubjectSelect: React.FC<SubjectSelectProps> = () => {
  const { data, error, loading } = useGetSubjectsQuery();

  const [value, setValue] = useState("chose a subject");
  const subjects = data?.getSubjects;

  return (
    <Box>
      {loading ? (
        <div>loading...</div>
      ) : (
        <React.Fragment>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              {value}
            </MenuButton>
            <MenuList h={80} sx={{ overflow: "scroll" }}>
              {subjects.map((item, key) => (
                <MenuItem onClick={() => setValue(item.name)} key={key}>
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

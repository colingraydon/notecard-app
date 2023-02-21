import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  useMeQuery,
  useCreateSubjectMutation,
  useGetSubjectsQuery,
} from "../generated/graphql";
import { SingleSub } from "../types";
import useIsAuth from "../utils/useIsAuth";
import { SubjectSelect } from "./SubjectSelect";

interface SubjectSelectWrapperProps {}

export const SubjectSelectWrapper: React.FC<
  SubjectSelectWrapperProps
> = ({}) => {
  const { data: dataMe, loading: loadingMe } = useMeQuery();
  const router = useRouter();

  useIsAuth();

  const { data, error, loading } = useGetSubjectsQuery();
  const [value, setValue] = useState({ name: "choose a subject", id: 0 });
  const subjects = data?.getSubjects;

  const handleClick = ({ name: string, id: number }: SingleSub) => {
    console.log("entered handleClick");
    setValue({ name: string, id: number });
  };

  return (
    <Box>
      {loadingMe ? (
        <Box>loading...</Box>
      ) : (
        <SubjectSelect
          loading={loading}
          handleClick={handleClick}
          subjects={subjects}
          value={value}
        />
      )}
    </Box>
  );
};

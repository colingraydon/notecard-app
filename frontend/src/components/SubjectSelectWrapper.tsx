import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  useMeQuery,
  useCreateSubjectMutation,
  useGetSubjectsQuery,
} from "../generated/graphql";
import { SingleSub } from "../types";
import useIsAuth from "../utils/useIsAuth";
import SingleNotecard from "./SingleNotecard";
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
  const [currSubState, setCurrSubState] = useState(null);

  const handleClick = ({ name: string, id: number }: SingleSub) => {
    setValue({ name: string, id: number });
    console.log("value: ", value);
    // console.log("before assignment currSubState: ", currSubState);

    // console.log("after assignment currSubState: ", currSubState);
  };

  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    if (initialRender) {
      setInitialRender(false);
    } else {
      console.log("subState pre: ", currSubState);
      const index: number = subjects.findIndex((sub) => sub.id === value.id);
      setCurrSubState(subjects[index]);
      console.log("subState post: ", currSubState);
    }
  }, [value]);

  //used to lock and unlock posts for editing
  const [lockState, setLockState] = useState(true);

  const handleLockState = () => {
    setLockState(!lockState);
  };
  return (
    <Box>
      {loadingMe || loading ? (
        <Box>loading...</Box>
      ) : (
        <Box>
          <SubjectSelect
            loading={loading}
            handleClick={handleClick}
            subjects={subjects}
            value={value}
          />
          {currSubState?.cards.map((item, key) => (
            <SingleNotecard
              title={item.title}
              text={item.text}
              key={key}
              cardId={item.cardId}
              lockState={lockState}
              handleLockState={handleLockState}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

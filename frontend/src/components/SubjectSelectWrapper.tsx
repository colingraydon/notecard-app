import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  useMeQuery,
  useCreateSubjectMutation,
  useGetSubjectsQuery,
} from "../generated/graphql";
import { CardArr, SingleSub } from "../types";
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
  const [value, setValue] = useState({
    name: "choose a subject",
    id: 0,
    cards: undefined,
  });

  const subjects = data?.getSubjects;

  const handleClick = ({ name, id }: SingleSub) => {
    setValue({
      name: name,
      id: id,
      cards: subjects[subjects.findIndex((sub) => sub.id === id)].cards,
    });
  };

  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    if (initialRender) {
      setInitialRender(false);
    } else {
      console.log("value.cards: ", value.cards);
      // console.log("typeof value.cards: ", typeof value.cards);
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
          {value?.cards?.map((item) => (
            <SingleNotecard
              title={item.title}
              text={item.text}
              key={item.cardId}
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

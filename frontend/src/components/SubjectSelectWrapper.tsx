import { Box, CircularProgress } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  useMeQuery,
  useCreateSubjectMutation,
  useGetSubjectsQuery,
  useDeleteCardMutation,
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

  //controls render state to avoid error on first hydration
  useEffect(() => {
    if (initialRender) {
      setInitialRender(false);
    } else {
      console.log("value.cards: ", value.cards);
    }
  }, [value]);

  //used to lock and unlock posts for editing
  const [lockState, setLockState] = useState(true);

  const handleLockState = () => {
    setLockState(!lockState);
  };

  const [deleteCard] = useDeleteCardMutation();
  const handleDelete = (subName: string, id: number, cardId: number) => {
    deleteCard({
      variables: { cardId },
      update: (cache) => {
        cache.evict({ id: "Card:" + cardId });
      },
    });
    const index = value.cards.findIndex((card) => card.cardId === cardId);

    const newVal = [];
    value.cards.forEach((card) => {
      if (card.cardId !== cardId) {
        newVal.push(card);
      }
    });
    setValue({
      name: subName,
      id: id,
      cards: newVal,
    });
  };

  return (
    <Box>
      {loadingMe || loading ? (
        <CircularProgress isIndeterminate value={50} />
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
              handleDelete={handleDelete}
              subName={value.name}
              id={value.id}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

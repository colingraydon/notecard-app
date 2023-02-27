import { Box, CircularProgress, Heading, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  useDeleteCardMutation,
  useGetSubjectsQuery,
  useMeQuery,
} from "../../generated/graphql";
import { SingleSub } from "../../types";
import useIsAuth from "../../utils/useIsAuth";
import { SubjectSelect } from "../SubjectSelect";
import SingleNotecard from "./SingleNotecard";

interface ViewNotecardsWrapperProps {}

export const ViewNotecardsWrapper: React.FC<
  ViewNotecardsWrapperProps
> = ({}) => {
  const { data: dataMe, loading: loadingMe } = useMeQuery();

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

  const handleChange = ({ name, id }: SingleSub) => {
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
    <Box p={8}>
      <Heading ml={4}>view notecards</Heading>
      {loadingMe || loading ? (
        <CircularProgress isIndeterminate value={50} />
      ) : (
        <Box ml={4} mt={12}>
          <SubjectSelect
            loading={loading}
            started={false}
            subjects={subjects}
            value={value}
            startedOnce={false}
            handleChange={handleChange}
            key={value.id}
          />
          {value?.cards?.length === 0 && (
            <Box mt={8}>
              <Link as={NextLink} href="/create-notecards">
                create notecards
              </Link>
            </Box>
          )}
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

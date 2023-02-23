import { Box, Button, CircularProgress, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useMeQuery, useGetSubjectsQuery } from "../../generated/graphql";
import { SingleSub } from "../../types";
import useIsAuth from "../../utils/useIsAuth";
import { SubjectSelect } from "../SubjectSelect";
import QuizCard from "./QuizCard";

interface QuizWrapperProps {}

const QuizWrapper: React.FC<QuizWrapperProps> = ({}) => {
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

  //used to start quiz
  const [started, setStarted] = useState(false);
  const handleStart = () => {
    setStarted(true);
  };

  /********controls render state for first render********** */
  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    if (initialRender) {
      setInitialRender(false);
    } else {
      console.log("value.cards: ", value.cards);
    }
  }, [value]);
  /**************************************************** */
  return (
    <Box>
      {loadingMe || loading ? (
        <CircularProgress isIndeterminate value={50} />
      ) : (
        <Flex>
          <Box>
            <SubjectSelect
              loading={loading}
              handleClick={handleClick}
              subjects={subjects}
              value={value}
            />
            {value?.cards?.map((item) => (
              <QuizCard
                title={item.title}
                text={item.text}
                key={item.cardId}
                cardId={item.cardId}
              />
            ))}
          </Box>
          <Button onClick={handleStart}>start</Button>
        </Flex>
      )}
    </Box>
  );
};

export default QuizWrapper;

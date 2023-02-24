import { Box, Button, CircularProgress, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useGetSubjectsQuery, useMeQuery } from "../../generated/graphql";
import { SingleSub } from "../../types";
import useIsAuth from "../../utils/useIsAuth";
import { SubjectSelect } from "../SubjectSelect";
import QuizCard from "./QuizCard";
import Timer from "./Timer";

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

  /*used forsubjectSelect component */
  const handleClick = ({ name, id }: SingleSub) => {
    setValue({
      name: name,
      id: id,
      cards: subjects[subjects.findIndex((sub) => sub.id === id)].cards,
    });
  };
  /**************************************** */

  /****handles menu change to generate cards ****/
  const handleChange = ({ name, id }: SingleSub) => {
    setValue({
      name: name,
      id: id,
      cards: subjects[subjects.findIndex((sub) => sub.id === id)].cards,
    });
  };
  /*************************************** */

  //used to start quiz
  const [started, setStarted] = useState(false);
  const handleStart = () => {
    console.log("handle start");
    setStarted(true);
  };

  /********controls render state for first render********** */
  // const [initialRender, setInitialRender] = useState(true);

  // useEffect(() => {
  //   if (initialRender) {
  //     setInitialRender(false);
  //   } else {
  //     console.log("value.cards: ", value.cards);
  //   }
  // }, [value]);
  /**************************************************** */

  //used to track checked state
  const [checkState, setCheckState] = useState(false);
  const [incorrectCountState, setIncorrectCountState] = useState(0);
  const handleCheckChange = () => {
    if (checkState) {
      setCheckState(false);
      setIncorrectCountState((count) => count - 1);
    } else {
      setCheckState(true);
      setIncorrectCountState((count) => count + 1);
    }
  };

  useEffect(
    () => console.log("countState: ", incorrectCountState),
    [incorrectCountState]
  );

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
              handleChange={handleChange}
              started={started}
            />
            {value?.cards?.map((item) => (
              <QuizCard
                title={item.title}
                text={item.text}
                key={item.cardId}
                cardId={item.cardId}
                checkState={checkState}
                handleCheckChange={handleCheckChange}
              />
            ))}
          </Box>
          <Button isDisabled={started} onClick={handleStart}>
            start
          </Button>
        </Flex>
      )}
      <Button>submit</Button>
      <Timer minutes={0} seconds={0} started={started} />
    </Box>
  );
};

export default QuizWrapper;

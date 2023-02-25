import { Box, Button, CircularProgress, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useGetSubjectsQuery, useMeQuery } from "../../generated/graphql";
import { SingleSub } from "../../types";
import useIsAuth from "../../utils/useIsAuth";
import { SubjectSelect } from "../SubjectSelect";
import QuizCard from "./QuizCard";
import QuizSidebar from "./QuizSidebar";
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
    prevScore: undefined,
    prevTime: undefined,
  });

  const subjects = data?.getSubjects;

  /*used forsubjectSelect component */
  // const handleClick = ({ name, id }: SingleSub) => {
  //   const index: number = subjects.findIndex((sub) => sub.id === id);
  //   setValue({
  //     name: name,
  //     id: id,
  //     cards: subjects[index].cards,
  //   });
  // };
  /**************************************** */

  /****handles menu change to generate cards ****/
  const handleChange = ({ name, id }: SingleSub) => {
    const index: number = subjects.findIndex((sub) => sub.id === id);
    setValue({
      name: name,
      id: id,
      cards: subjects[index].cards,
      prevScore: subjects[index].prevScore,
      prevTime: subjects[index].prevTime,
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
    <Flex>
      <Box>
        {loadingMe || loading ? (
          <CircularProgress isIndeterminate value={50} />
        ) : (
          <Flex>
            <Box>
              <SubjectSelect
                loading={loading}
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
      </Box>
      <QuizSidebar
        prevScore={value.prevScore}
        prevTime={value.prevTime}
        started={started}
      />
    </Flex>
  );
};

export default QuizWrapper;

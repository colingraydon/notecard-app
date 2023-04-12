import {
  Box,
  Button,
  CircularProgress,
  Flex,
  Heading,
  Link,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React, { useEffect, useState } from "react";
import { useGetSubjectsQuery, useMeQuery } from "../../generated/graphql";
import { SingleSub } from "../../types";
import useIsAuth from "../../utils/useIsAuth";
import { SubjectSelect } from "../SubjectSelect";
import QuizCard from "./QuizCard";

import { clickGreen, green, hoverGreen } from "../../styles/themes/Lightmode";
import QuizSidebar from "./QuizSidebar";

interface QuizWrapperTestProps {}

const QuizWrapperTest: React.FC<QuizWrapperTestProps> = ({}) => {
  const { data: dataMe, loading: loadingMe } = useMeQuery();

  // useIsAuth();

  const { data, error, loading } = useGetSubjectsQuery({
    fetchPolicy: "cache-and-network",
  });
  const [value, setValue] = useState({
    name: "choose a subject",
    id: 0,
    cards: undefined,
    prevScore: undefined,
    prevTime: undefined,
    numQuestions: 0,
  });

  const subjects = data?.getSubjects;

  /****handles menu change to generate cards ****/
  const handleChange = ({ name, id }: SingleSub) => {
    const index: number = subjects.findIndex((sub) => sub.id === id);
    setValue({
      name: name,
      id: id,
      cards: subjects[index].cards,
      prevScore: subjects[index].prevScore,
      prevTime: subjects[index].prevTime,
      numQuestions: subjects[index].cards.length,
    });
  };
  /*************************************** */

  //used to start and stop  quiz
  const [started, setStarted] = useState(false);
  const [startedOnce, setStartedOnce] = useState(false);
  const handleStarted = () => {
    setStarted(!started);
    setStartedOnce(true);
  };

  //used to track incorrect state
  const [incorrectCountState, setIncorrectCountState] = useState(0);
  const handleCheckChange = (check: boolean) => {
    check
      ? setIncorrectCountState(incorrectCountState - 1)
      : setIncorrectCountState(incorrectCountState + 1);
  };

  return (
    <Flex pr={4} pl={2}>
      <Box w={1420} minW={1420}>
        <Flex>
          <Box p={8} pb={2}>
            <Box w={1100}>
              <Heading ml={4} mb={12}>
                quiz
              </Heading>
              <Flex>
                <Box>
                  <Flex>
                    <Box ml={4} mb={12}>
                      <SubjectSelect
                        loading={loading}
                        subjects={subjects}
                        value={value}
                        handleChange={handleChange}
                        started={startedOnce}
                        startedOnce={startedOnce}
                      />
                    </Box>

                    {value?.id === 0 || value?.cards.length === 0 ? null : (
                      <Box ml="auto" pr={4}>
                        <Button
                          w={24}
                          isDisabled={startedOnce}
                          onClick={handleStarted}
                          background={green}
                          _hover={{ background: hoverGreen }}
                          _active={{ background: clickGreen }}
                          boxShadow="xl"
                        >
                          start
                        </Button>
                      </Box>
                    )}
                  </Flex>
                  {value?.cards?.length === 0 && (
                    <Box ml={4}>
                      <Link as={NextLink} href="/create-notecards">
                        create notecards
                      </Link>
                    </Box>
                  )}
                  {subjects?.length === 0 && (
                    <Box ml={4}>
                      <Link as={NextLink} href="/create-subject">
                        create subjects to get started.
                      </Link>
                    </Box>
                  )}
                  {value?.cards?.map((item) => (
                    <QuizCard
                      title={item.title}
                      text={item.text}
                      key={item.cardId}
                      cardId={item.cardId}
                      handleCheckChange={handleCheckChange}
                    />
                  ))}
                </Box>
              </Flex>
            </Box>
          </Box>
          {value?.id === 0 ? null : (
            <Box mt={2}>
              <QuizSidebar
                prevScore={value.prevScore}
                prevTime={value.prevTime}
                started={started}
                id={value.id}
                name={value.name}
                hasCards={value.cards.length}
                handleStarted={handleStarted}
                score={Math.floor(
                  ((value.numQuestions - incorrectCountState) /
                    value.numQuestions) *
                    100
                )}
              />
            </Box>
          )}
        </Flex>
      </Box>
    </Flex>
  );
};

export default QuizWrapperTest;

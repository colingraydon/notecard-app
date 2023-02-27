import {
  Box,
  Button,
  CircularProgress,
  Flex,
  Heading,
  Link,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useGetSubjectsQuery, useMeQuery } from "../../generated/graphql";
import { SingleSub } from "../../types";
import useIsAuth from "../../utils/useIsAuth";
import { SubjectSelect } from "../SubjectSelect";
import QuizCard from "./QuizCard";
import NextLink from "next/link";

import QuizSidebar from "./QuizSidebar";

interface QuizWrapperProps {}

const QuizWrapper: React.FC<QuizWrapperProps> = ({}) => {
  const { data: dataMe, loading: loadingMe } = useMeQuery();

  useIsAuth();

  const { data, error, loading } = useGetSubjectsQuery();
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
  const handleStarted = () => {
    console.log("handle start");
    setStarted(!started);
  };

  //used to track incorrect state
  const [incorrectCountState, setIncorrectCountState] = useState(0);
  const handleCheckChange = (check: boolean) => {
    check
      ? setIncorrectCountState(incorrectCountState - 1)
      : setIncorrectCountState(incorrectCountState + 1);
  };

  //for testing incorrect count
  useEffect(() => {
    console.log("incorrect: ", incorrectCountState);
    console.log("num questions: ", value.cards?.length);
  });

  return (
    <Flex>
      <Box p={8} pb={2}>
        {loadingMe || loading ? (
          <CircularProgress isIndeterminate value={50} />
        ) : (
          <Box>
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
                      started={started}
                    />
                  </Box>
                  {value?.id === 0 || value?.cards.length === 0 ? null : (
                    <Box ml="auto" pr={4}>
                      <Button
                        w={24}
                        isDisabled={started}
                        onClick={handleStarted}
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
        )}
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
  );
};

export default QuizWrapper;

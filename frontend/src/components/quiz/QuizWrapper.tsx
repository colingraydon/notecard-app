import { Box, Button, CircularProgress, Flex, Link } from "@chakra-ui/react";
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

  //used to start quiz
  const [started, setStarted] = useState(false);
  const handleStart = () => {
    console.log("handle start");
    setStarted(true);
  };

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

  return (
    <Flex>
      <Box p={8} pb={2}>
        {loadingMe || loading ? (
          <CircularProgress isIndeterminate value={50} />
        ) : (
          <Box>
            <Box ml={4} fontSize={32} mb={12}>
              quiz
            </Box>
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
                      <Button w={24} isDisabled={started} onClick={handleStart}>
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
                    checkState={checkState}
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
            numQuestions={value.numQuestions}
            numIncorrect={incorrectCountState}
            id={value.id}
            name={value.name}
            hasCards={value.cards.length}
          />
        </Box>
      )}
    </Flex>
  );
};

export default QuizWrapper;

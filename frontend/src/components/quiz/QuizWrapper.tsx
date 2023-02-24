import {
  Box,
  Button,
  CircularProgress,
  Flex,
  FormControl,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
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

  /*not currently needed, used for old subjectSelect component */
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

  //tracks state of

  //used to track checked state
  const [checkState, setCheckState] = useState(false);
  const [incorrectCountState, setIncorrectCountState] = useState(0);
  const handleCheckChange = () => {
    console.log("test");
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
          <Button onClick={handleStart}>start</Button>
        </Flex>
      )}
    </Box>
  );
};

export default QuizWrapper;

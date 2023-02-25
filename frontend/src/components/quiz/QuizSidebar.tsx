import { Box, Button, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useUpdateSubjectMutation } from "../../generated/graphql";

interface QuizSidebarProps {
  prevScore: number;
  prevTime: number;
  started: boolean;
  numQuestions: number;
  numIncorrect: number;
  id: number;
  name: string;
  hasCards: number;
}

const QuizSidebar: React.FC<QuizSidebarProps> = (props: QuizSidebarProps) => {
  /* ****************used for timer********/
  const [time, setTime] = React.useState({
    minutes: 0,
    seconds: 0,
  });

  const tick = () => {
    if (props.started) {
      if (time.seconds === 59) {
        setTime({ minutes: time.minutes + 1, seconds: 0 });
      } else {
        setTime({
          minutes: time.minutes,
          seconds: time.seconds + 1,
        });
      }
    }
  };

  useEffect(() => {
    const timerId = setInterval(() => tick(), 1000);
    return () => clearInterval(timerId);
  });
  /* *************************************/

  /**********used to convert props of previous time*********/
  const [prevStringTime, setPrevStringTime] = useState({
    seconds: props.prevTime % 60,
    minutes: (props.prevTime - (props.prevTime % 60)) / 60,
  });

  useEffect(() => {
    setPrevStringTime({
      seconds: props.prevTime % 60,
      minutes: (props.prevTime - (props.prevTime % 60)) / 60,
    });
  }, [props.hasCards]);
  /**********************************************/

  const [updateSubject] = useUpdateSubjectMutation();

  return (
    <Box position="sticky" top={55} height="1" zIndex="0" pr={2}>
      {props.hasCards === 0 ? null : (
        <Box>
          <Box h={8}></Box>
          <Box p={3} w={200} border="solid" borderRadius={12} borderWidth={1}>
            <Flex>
              <Box fontSize={28} textAlign="end">
                {`${time.minutes.toString().padStart(2, "0")}:${time.seconds
                  .toString()
                  .padStart(2, "0")}`}
              </Box>
              {/* <Box>{props.numCards}</Box>
              <Box>{typeof props.numCards}</Box> */}
              <Box ml="auto">
                <Button
                  onClick={() =>
                    updateSubject({
                      variables: {
                        input: {
                          id: props.id,
                          name: props.name,
                          prevTime: time.minutes * 60 + time.seconds,
                          prevScore: Math.floor(
                            ((props.numQuestions - props.numIncorrect) /
                              props.numQuestions) *
                              100
                          ),
                        },
                      },
                    })
                  }
                >
                  submit
                </Button>
              </Box>
            </Flex>
          </Box>
          {props.prevScore === null ? null : (
            <Box p={3} border="solid" borderRadius={12} borderWidth={1} mt={4}>
              {props.prevScore === null ? null : (
                <Flex>
                  <Box>previous score: </Box>
                  <Box ml="auto">{props.prevScore}%</Box>
                </Flex>
              )}
              {props.prevTime === null ? null : (
                <Flex>
                  <Box mt={4}>previous time:</Box>
                  <Box mt={4} ml="auto">
                    {prevStringTime.minutes}:
                    {prevStringTime.seconds < 10 ? "0" : null}
                    {prevStringTime.seconds}
                  </Box>
                </Flex>
              )}
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default QuizSidebar;

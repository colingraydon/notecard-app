import { Box, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Timer from "./Timer";

interface QuizSidebarProps {
  prevScore: number;
  prevTime: number;
  started: boolean;
  numQuestions: number;
  numIncorrect: number;
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

  const [prevStringTime, setPrevStringTime] = useState({
    seconds: props.prevTime % 60,
    minutes: (props.prevTime - (props.prevTime % 60)) / 60,
  });

  useEffect(() => {
    setPrevStringTime({
      seconds: props.prevTime % 60,
      minutes: (props.prevTime - (props.prevTime % 60)) / 60,
    });
  }, [props.prevTime]);
  return (
    <Box mt={8}>
      <Box p={3} border="solid" borderRadius={12} borderWidth={1} mr={2}>
        <Box fontSize={28}>
          {`${time.minutes.toString().padStart(2, "0")}:${time.seconds
            .toString()
            .padStart(2, "0")}`}
        </Box>
        {props.prevScore === null ? null : (
          <Box mt={4}>previous score: {props.prevScore}%</Box>
        )}
        {props.prevTime === null ? null : (
          <Box mt={4}>
            previous time: {prevStringTime.minutes}:{prevStringTime.seconds}
            {}
          </Box>
        )}
        <Button mt={4}>submit</Button>
      </Box>
    </Box>
  );
};

export default QuizSidebar;

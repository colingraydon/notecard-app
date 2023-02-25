import { Box } from "@chakra-ui/react";
import React, { useEffect } from "react";

interface TimerProps {
  minutes: number;
  seconds: number;
  started: boolean;
}

const Timer: React.FC<TimerProps> = (props: TimerProps) => {
  const [time, setTime] = React.useState({
    minutes: props.minutes,
    seconds: props.seconds,
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

  return (
    <Box fontSize={28}>
      {`${time.minutes.toString().padStart(2, "0")}:${time.seconds
        .toString()
        .padStart(2, "0")}`}
    </Box>
  );
};

export default Timer;

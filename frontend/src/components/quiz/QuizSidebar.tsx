import { Box } from "@chakra-ui/react";
import React from "react";
import Timer from "./Timer";

interface QuizSidebarProps {
  prevScore: number;
  prevTime: number;
  started: boolean;
}

const QuizSidebar: React.FC<QuizSidebarProps> = (props: QuizSidebarProps) => {
  return (
    <Box>
      <Box>{props.prevScore}</Box>
      <Box>{props.prevTime}</Box>
      <Timer minutes={0} seconds={0} started={props.started} />
    </Box>
  );
};

export default QuizSidebar;

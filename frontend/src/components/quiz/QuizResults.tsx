import { Box } from "@chakra-ui/react";
import React from "react";

interface QuizResultsProps {
  prevSeconds: number;
  prevMinutes: number;
  prevScore: number;
  currSeconds: number;
  currMinutes: number;
  currScure: number;
}

const QuizResults: React.FC<QuizResultsProps> = ({}) => {
  return (
    <Box>
      <Box>hello</Box>
    </Box>
  );
};

export default QuizResults;

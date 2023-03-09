import { Box, Flex } from "@chakra-ui/react";
import React from "react";

interface QuizResultsProps {
  prevSeconds: number;
  prevMinutes: number;
  prevScore: number;
  currSeconds: number;
  currMinutes: number;
  currScore: number;
}

const QuizResults: React.FC<QuizResultsProps> = (props: QuizResultsProps) => {
  const {
    prevSeconds,
    prevMinutes,
    prevScore,
    currSeconds,
    currMinutes,
    currScore,
  } = props;

  const congrats = (
    <Box>
      <Box>
        {currScore === 100 ? (
          <Box>congrats! you aced it.</Box>
        ) : (
          <Box>congrats!</Box>
        )}
        {currScore > prevScore ? (
          <Box mt={6}>
            you've improved your score by {currScore - prevScore} points.
          </Box>
        ) : (
          currScore !== 100 && (
            <Box mt={6}>you've maintained the same score</Box>
          )
        )}
      </Box>
    </Box>
  );

  const score = (
    <Box>
      <Flex w={200} mt={2}>
        <Box>score: </Box>
        <Box ml="auto">{props.currScore}</Box>
      </Flex>
      <Flex w={200}>
        <Box>previous score: </Box>
        <Box ml="auto">{props.prevScore}</Box>
      </Flex>
    </Box>
  );
  const time = (
    <Box>
      {currMinutes < prevMinutes ||
      (currMinutes === prevMinutes && currSeconds < prevSeconds) ? (
        <Box>you improved your time!</Box>
      ) : (
        <Box></Box>
      )}
      <Flex w={200} mt={2}>
        <Box>time:</Box>
        <Box ml="auto">
          {currMinutes}:{currSeconds < 10 ? "0" : null}
          {currSeconds}
        </Box>
      </Flex>
      <Flex w={200}>
        <Box>previous time:</Box>
        <Box ml="auto">
          {prevMinutes}:{prevSeconds < 10 ? "0" : null}
          {prevSeconds}
        </Box>
      </Flex>
    </Box>
  );
  return (
    <Box>
      <Box>{currScore >= prevScore && currScore > 0 && congrats}</Box>
      <Box>{score}</Box>
      <Box mt={6}>{time}</Box>
    </Box>
  );
};

export default QuizResults;

import { Box, Divider, Flex } from "@chakra-ui/react";
import React from "react";

interface SingleSubjectProps {
  name: string;
  id: number;
  prevScore: number;
  prevTime: number;
  updatedAt: string;
}

const SingleSubject: React.FC<SingleSubjectProps> = (
  props: SingleSubjectProps
) => {
  return (
    <Box>
      <Box mt={8} h={25}>
        <Flex>
          <Box>{props.name}</Box>
          <Box p={2}>
            <Divider orientation="vertical" />
          </Box>
          <Box>previous score: {props.prevScore}%</Box>
          <Box p={2}>
            <Divider orientation="vertical" />
          </Box>
          <Box onClick={() => console.log("props.prevTime: ", props.prevTime)}>
            previous time: {props.prevTime}
          </Box>
          <Box p={2}>
            <Divider orientation="vertical" />
          </Box>
          <Box>{props.updatedAt}</Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default SingleSubject;

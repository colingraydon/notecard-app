import { Box, Flex, Textarea } from "@chakra-ui/react";
import React from "react";

interface SingleNotecardProps {
  title: string;
  text: string;
}

const SingleNotecard: React.FC<SingleNotecardProps> = (
  props: SingleNotecardProps
) => {
  return (
    <Box>
      <Flex>
        <Textarea w={300} isReadOnly>
          {props.title}
        </Textarea>
        <Textarea w={300} isReadOnly>
          {props.text}
        </Textarea>
      </Flex>
    </Box>
  );
};

export default SingleNotecard;

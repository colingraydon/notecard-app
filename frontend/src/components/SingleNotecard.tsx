import { Box, Flex, Textarea } from "@chakra-ui/react";
import React, { useState } from "react";
import { EditDeleteCard } from "./EditDeleteCard";

interface SingleNotecardProps {
  title: string;
  text: string;
  cardId: number;
}

const SingleNotecard: React.FC<SingleNotecardProps> = (
  props: SingleNotecardProps
) => {
  const [lockState, setLockState] = useState(true);
  return (
    <Box>
      <Flex>
        <Textarea w={300} isReadOnly value={props.title}></Textarea>
        <Textarea w={300} isReadOnly value={props.text}></Textarea>
        <EditDeleteCard cardId={props.cardId} />
      </Flex>
    </Box>
  );
};

export default SingleNotecard;

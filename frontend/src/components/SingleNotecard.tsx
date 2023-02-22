import { Box, Flex, Textarea } from "@chakra-ui/react";
import React, { useState } from "react";
import { EditDeleteCard } from "./EditDeleteCard";

interface SingleNotecardProps {
  title: string;
  text: string;
  cardId: number;
  lockState: boolean;
  handleLockState: () => void;
}

const SingleNotecard: React.FC<SingleNotecardProps> = (
  props: SingleNotecardProps
) => {
  const [textState, setTextState] = useState(props.text);
  const [titleState, setTitleState] = useState(props.title);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextState(e.target.value);
    console.log("text value: ", textState);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitleState(e.target.value);
    console.log("title value: ", titleState);
  };
  return (
    <Box>
      <Flex>
        <Textarea
          w={400}
          defaultValue={titleState}
          onChange={handleTitleChange}
          mr={4}
        ></Textarea>
        <Textarea
          w={400}
          defaultValue={textState}
          onChange={handleTextChange}
        ></Textarea>
        <EditDeleteCard
          lockState={props.lockState}
          cardId={props.cardId}
          handleLockState={props.handleLockState}
          text={props.text}
          title={props.title}
        />
      </Flex>
    </Box>
  );
};

export default SingleNotecard;

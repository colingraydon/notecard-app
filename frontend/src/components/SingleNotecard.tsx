import { DeleteIcon, LockIcon, UnlockIcon } from "@chakra-ui/icons";
import { Box, Divider, Flex, IconButton, Textarea } from "@chakra-ui/react";
import React, { useState } from "react";
import {
  useDeleteCardMutation,
  useUpdateCardMutation,
} from "../generated/graphql";
import { SingleSub } from "../types";

interface SingleNotecardProps {
  title: string;
  text: string;
  cardId: number;
  lockState: boolean;
  subName: string; //subjectname
  id: number; //subjectId
  handleLockState: () => void;
  handleDelete: (name: string, id: number, cardId: number) => void;
}

const SingleNotecard: React.FC<SingleNotecardProps> = (
  props: SingleNotecardProps
) => {
  const [textState, setTextState] = useState(props.text);
  const [titleState, setTitleState] = useState(props.title);

  //extra state tracking to reduce sql queries, updateCard will not run if false
  const [updated, setUpdate] = useState(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextState(e.target.value);
    setUpdate(true);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitleState(e.target.value);
    setUpdate(true);
  };

  const [deleteCard] = useDeleteCardMutation();
  const [updateCard] = useUpdateCardMutation();

  return (
    <Box w={886} mt={8}>
      <Flex>
        <Box p={3} border="solid" borderRadius={12} borderWidth={1} mr={2}>
          <Textarea
            w={400}
            h={200}
            defaultValue={titleState}
            onChange={handleTitleChange}
            isReadOnly={props.lockState}
            resize="none"
          ></Textarea>
        </Box>
        <Box h={226} mr={2} ml={2}>
          <Divider orientation="vertical" />
        </Box>
        <Box p={3} border="solid" borderRadius={12} borderWidth={1} ml={2}>
          <Textarea
            w={400}
            h={200}
            defaultValue={textState}
            onChange={handleTextChange}
            isReadOnly={props.lockState}
            resize="none"
          ></Textarea>
        </Box>
      </Flex>
      <Flex mt={2} justify="end">
        <IconButton
          ml={5}
          icon={<DeleteIcon />}
          aria-label="Delete Card"
          onClick={() => {
            props.handleDelete(props.subName, props.id, props.cardId);
          }}
        />
        <IconButton
          ml={5}
          icon={props.lockState ? <LockIcon /> : <UnlockIcon />}
          aria-label="Edit Card"
          onClick={() => {
            props.handleLockState();
            console.log("textState: ", textState);
            !props.lockState &&
              updated &&
              updateCard({
                variables: {
                  cardId: props.cardId,
                  text: textState,
                  title: titleState,
                },
              });
            setUpdate(false);
          }}
        />
      </Flex>
    </Box>
  );
};

export default SingleNotecard;

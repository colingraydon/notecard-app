import { DeleteIcon, LockIcon, UnlockIcon } from "@chakra-ui/icons";
import { Box, Flex, IconButton, Textarea } from "@chakra-ui/react";
import React, { useState } from "react";
import {
  useDeleteCardMutation,
  useUpdateCardMutation,
} from "../generated/graphql";

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
    <Box>
      <Flex>
        <Textarea
          w={400}
          h={200}
          defaultValue={titleState}
          onChange={handleTitleChange}
          isReadOnly={props.lockState}
          mr={4}
        ></Textarea>
        <Textarea
          w={400}
          h={200}
          defaultValue={textState}
          onChange={handleTextChange}
          isReadOnly={props.lockState}
        ></Textarea>
        <Box>
          <IconButton
            ml={5}
            icon={<DeleteIcon />}
            aria-label="Delete Card"
            onClick={() => {
              console.log("props.cardId: ", props.cardId);
              deleteCard({
                variables: { cardId: props.cardId },
                update: (cache) => {
                  cache.evict({ id: "Card:" + props.cardId });
                },
              });
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
            }}
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default SingleNotecard;

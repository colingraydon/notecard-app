import { DeleteIcon, LockIcon, UnlockIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDeleteCardMutation } from "../generated/graphql";

interface EditDeleteCardProps {
  cardId: number;
  lockState: boolean;
  handleLockState: () => void;
  text: string;
  title: string;
}

export const EditDeleteCard: React.FC<EditDeleteCardProps> = (props) => {
  const [deleteCard] = useDeleteCardMutation();

  return (
    <Flex>
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
        icon={props.lockState ? <UnlockIcon /> : <LockIcon />}
        aria-label="Edit Card"
        onClick={() => props.handleLockState()}
      />
    </Flex>
  );
};

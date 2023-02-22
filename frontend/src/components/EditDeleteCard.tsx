import { DeleteIcon, LockIcon, UnlockIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDeleteCardMutation } from "../generated/graphql";

interface EditDeleteCardProps {
  cardId: number;
}

export const EditDeleteCard: React.FC<EditDeleteCardProps> = (props) => {
  const [deleteCard] = useDeleteCardMutation();
  //used to lock and unlock posts for editing
  const [lockState, setLockState] = useState(true);
  return (
    <Flex>
      <IconButton
        ml={5}
        icon={<DeleteIcon />}
        aria-label="Delete Post"
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
        icon={lockState ? <UnlockIcon /> : <LockIcon />}
        aria-label="Edit Post"
        onClick={() => setLockState(!lockState)}
      />
    </Flex>
  );
};

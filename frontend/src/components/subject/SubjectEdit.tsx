import { LockIcon, UnlockIcon } from "@chakra-ui/icons";
import { Box, IconButton } from "@chakra-ui/react";
import React, { ChangeEvent } from "react";
import { useUpdateSubjectNameMutation } from "../../generated/graphql";
import {
  purple,
  hoverPurple,
  clickPurple,
} from "../../styles/themes/Lightmode";

interface SubjectEditProps {
  name: string;
  id: number;
  prevScore: number;
  prevTime: number;
  lockState: boolean;
  handleLockState: () => void;
  handleNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SubjectEdit: React.FC<SubjectEditProps> = (props: SubjectEditProps) => {
  const [updateSubjectName] = useUpdateSubjectNameMutation();

  return (
    <Box>
      <IconButton
        ml={2}
        icon={props.lockState ? <LockIcon /> : <UnlockIcon />}
        aria-label="Update Subject"
        background={purple}
        _hover={{ background: hoverPurple }}
        _active={{ background: clickPurple }}
        onClick={() => {
          props.handleLockState();
          if (
            !props.lockState &&
            props.name.length > 0 &&
            props.name.length < 30
          ) {
            updateSubjectName({
              variables: {
                id: props.id,
                name: props.name,
              },
              update: (cache) => {
                cache.evict({ fieldName: "getNotifications" });
              },
            });
          }
        }}
      />
    </Box>
  );
};

export default SubjectEdit;

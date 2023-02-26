import { EditIcon, LockIcon, UnlockIcon } from "@chakra-ui/icons";
import { Box, IconButton } from "@chakra-ui/react";
import React, { ChangeEvent, useState } from "react";
import {
  useUpdateSubjectMutation,
  useUpdateSubjectNameMutation,
} from "../../generated/graphql";

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
        onClick={() => {
          props.handleLockState();
          !props.lockState && props.name.length > 0 && props.name.length < 30;
          updateSubjectName({
            variables: {
              id: props.id,
              name: props.name,
            },
          });
        }}
      />
    </Box>
  );
};

export default SubjectEdit;

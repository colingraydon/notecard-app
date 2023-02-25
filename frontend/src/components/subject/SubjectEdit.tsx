import { Box } from "@chakra-ui/react";
import React from "react";

interface SubjectEditProps {
  name: string;
  id: number;
  prevScore: number;
  prevTime: number;
  lockState: boolean;
  handleLockState: () => void;
  handleNameChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const SubjectEdit: React.FC<SubjectEditProps> = ({}) => {
  return <Box></Box>;
};

export default SubjectEdit;

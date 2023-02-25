import { DeleteIcon, LockIcon, UnlockIcon } from "@chakra-ui/icons";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";

interface SubjectEditDeleteProps {
  name: string;
  id: number;
  prevScore: number;
  prevTime: number;
  lockState: boolean;
  handleLockState: () => void;
  handleDelete: (id: number) => void;
}

const SubjectEditDelete: React.FC<SubjectEditDeleteProps> = (
  props: SubjectEditDeleteProps
) => {
  //extra state tracking to reduce sql queries, updateCard will not run if false
  const [updated, setUpdate] = useState(false);

  const [nameState, setNameState] = useState(props.name);
  const handleNameChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNameState(e.target.value);
    setUpdate(true);
  };

  //needed for chakra alert
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  return (
    <Box>
      <Flex mt={2} justify="end">
        <IconButton
          ml={2}
          icon={<DeleteIcon />}
          aria-label="Delete Subject"
          onClick={onOpen}
        />
        <Box>
          <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  delete subject
                </AlertDialogHeader>

                <AlertDialogBody>
                  are you sure? you can't undo this action afterwards.
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onClose}>
                    cancel
                  </Button>
                  <Button colorScheme="red" onClick={onClose} ml={3}>
                    delete
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </Box>
      </Flex>
    </Box>
  );
};

export default SubjectEditDelete;

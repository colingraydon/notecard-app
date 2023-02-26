import { DeleteIcon } from "@chakra-ui/icons";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

interface SubjectDeleteProps {
  id: number;
  handleDelete: (id: number) => void;
}

const SubjectDelete: React.FC<SubjectDeleteProps> = (
  props: SubjectDeleteProps
) => {
  //needed for chakra alert
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const deleteClose = () => {
    props.handleDelete(props.id);
    onClose();
  };
  return (
    <Box>
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
                <Button colorScheme="red" onClick={deleteClose} ml={3}>
                  delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Box>
    </Box>
  );
};

export default SubjectDelete;

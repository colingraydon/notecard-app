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
  useToast,
} from "@chakra-ui/react";
import React from "react";
import {
  clickGreen,
  clickPurple,
  green,
  hoverGreen,
  hoverPurple,
  purple,
} from "../../styles/themes/Lightmode";

interface SubjectDeleteProps {
  id: number;
  handleDeleteSubject: (id: number) => void;
}

const SubjectDelete: React.FC<SubjectDeleteProps> = (
  props: SubjectDeleteProps
) => {
  //needed for chakra alert
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const toast = useToast();
  const deleteClose = () => {
    props.handleDeleteSubject(props.id);
    toast({
      title: "subject deleted.",
      description: "we've deleted the subject for you.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    onClose();
  };
  return (
    <Box>
      <IconButton
        ml={2}
        icon={<DeleteIcon />}
        aria-label="Delete Subject"
        onClick={onOpen}
        background={purple}
        _hover={{ background: hoverPurple }}
        _active={{ background: clickPurple }}
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

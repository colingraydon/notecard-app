import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FocusLock,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from "@chakra-ui/react";

import React from "react";
import { green, hoverGreen, clickGreen } from "../../themes/Lightmode";
import RegisterForm from "./RegisterForm";

const RegisterPopoverForm = () => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const firstFieldRef = React.useRef(null);

  return (
    <>
      <Popover
        isOpen={isOpen}
        initialFocusRef={firstFieldRef}
        onOpen={onOpen}
        onClose={onClose}
        placement="right"
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <Button
            aria-label="register"
            size="md"
            background={green}
            _hover={{ background: hoverGreen }}
            _active={{ background: clickGreen }}
          >
            register
          </Button>
        </PopoverTrigger>
        <PopoverContent p={5}>
          {/* removed return focus */}
          <FocusLock persistentFocus={false}>
            <PopoverArrow />
            <PopoverCloseButton />
            <RegisterForm firstFieldRef={firstFieldRef} onCancel={onClose} />
          </FocusLock>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default RegisterPopoverForm;

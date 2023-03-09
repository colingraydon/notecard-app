import {
  Button,
  FocusLock,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from "@chakra-ui/react";

import React from "react";
import {
  clickPurple,
  hoverPurple,
  purple,
} from "../../styles/themes/Lightmode";
import LoginForm from "./LoginForm";
const LoginPopoverForm = () => {
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
            aria-label="test"
            size="md"
            background={purple}
            _hover={{ background: hoverPurple }}
            _active={{ background: clickPurple }}
          >
            login
          </Button>
        </PopoverTrigger>
        <PopoverContent p={5}>
          <FocusLock persistentFocus={false}>
            <PopoverArrow />
            <PopoverCloseButton />
            <LoginForm firstFieldRef={firstFieldRef} onCancel={onClose} />
          </FocusLock>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default LoginPopoverForm;

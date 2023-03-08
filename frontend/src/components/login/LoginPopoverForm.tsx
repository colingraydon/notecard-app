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
import LoginForm from "./LoginForm";
import { MdLogin } from "react-icons/md";
import {
  green,
  hoverGreen,
  clickGreen,
  purple,
  hoverPurple,
  clickPurple,
} from "../../themes/Lightmode";
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
          {/* removed return focus */}
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

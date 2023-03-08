import {
  Box,
  Button,
  Checkbox,
  Divider,
  Fade,
  Flex,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {
  clickBlue,
  clickPurple,
  hoverBlue,
  hoverPurple,
  purple,
} from "../../themes/Lightmode";

interface QuizCardProps {
  title: string;
  text: string;
  cardId: number;

  handleCheckChange: (check: boolean) => void;
}

const QuizCard: React.FC<QuizCardProps> = (props: QuizCardProps) => {
  const { isOpen, onToggle } = useDisclosure();

  const [checkedState, setCheckedState] = useState(false);

  const handleCheckedChange = () => {
    setCheckedState(!checkedState);
  };
  return (
    <Box>
      <Box mb={8} p={4}>
        <Flex>
          <Box
            p={3}
            border="solid"
            borderRadius={12}
            borderWidth={1}
            mr={2}
            boxShadow="xl"
          >
            <Textarea
              w={400}
              h={200}
              defaultValue={props.title}
              isReadOnly
              resize="none"
              borderColor="gray.200"
              _active={{ borderColor: clickBlue }}
            ></Textarea>
          </Box>
          <Box h={226} mr={2} ml={2}>
            <Divider orientation="vertical" borderColor="gray.400" />
          </Box>
          <Box
            p={3}
            border="solid"
            borderRadius={12}
            borderWidth={1}
            ml={2}
            boxShadow="xl"
          >
            <Fade in={isOpen}>
              <Textarea
                w={400}
                h={200}
                defaultValue={props.text}
                isReadOnly
                resize="none"
                borderColor="gray.200"
                _active={{ borderColor: clickBlue }}
              ></Textarea>
            </Fade>
          </Box>
        </Flex>
        <Flex align="center" justify="end" mt={4}>
          <Box textAlign="end" mr={4}>
            <Checkbox
              key={props.cardId}
              onChange={() => {
                props.handleCheckChange(checkedState);
                handleCheckedChange();
              }}
            >
              mark incorrect
            </Checkbox>
          </Box>
          <Box>
            <Button
              w={20}
              onClick={onToggle}
              background={purple}
              _hover={{ background: hoverPurple }}
              _active={{ background: clickPurple }}
              boxShadow="xl"
            >
              {isOpen ? "hide" : "show"}
            </Button>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default QuizCard;

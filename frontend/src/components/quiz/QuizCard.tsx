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
          <Box p={3} border="solid" borderRadius={12} borderWidth={1} mr={2}>
            <Textarea
              w={400}
              h={200}
              defaultValue={props.title}
              isReadOnly
              resize="none"
            ></Textarea>
          </Box>
          <Box h={226} mr={2} ml={2}>
            <Divider orientation="vertical" />
          </Box>
          <Box p={3} border="solid" borderRadius={12} borderWidth={1} ml={2}>
            <Fade in={isOpen}>
              <Textarea
                w={400}
                h={200}
                defaultValue={props.text}
                isReadOnly
                resize="none"
              ></Textarea>
            </Fade>
          </Box>
        </Flex>
        <Flex align="center" justify="end" mt={1}>
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
            <Button w={20} onClick={onToggle}>
              {isOpen ? "hide" : "show"}
            </Button>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default QuizCard;

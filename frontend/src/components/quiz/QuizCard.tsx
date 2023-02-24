import { Flex, Textarea, Box, Checkbox, Center } from "@chakra-ui/react";
import React from "react";

interface QuizCardProps {
  title: string;
  text: string;
  cardId: number;
}

const QuizCard: React.FC<QuizCardProps> = (props: QuizCardProps) => {
  return (
    <Box mb={8}>
      <Flex>
        <Textarea
          w={400}
          h={200}
          defaultValue={props.title}
          isReadOnly
          mr={4}
          resize="none"
        ></Textarea>
        <Textarea
          w={400}
          h={200}
          defaultValue={props.text}
          isReadOnly
          resize="none"
        ></Textarea>
      </Flex>
      <Box textAlign="end">
        <Checkbox>mark for review</Checkbox>
      </Box>
    </Box>
  );
};

export default QuizCard;

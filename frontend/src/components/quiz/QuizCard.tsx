import { Flex, Textarea, Box, Checkbox } from "@chakra-ui/react";
import React from "react";

interface QuizCardProps {
  title: string;
  text: string;
  cardId: number;
}

const QuizCard: React.FC<QuizCardProps> = (props: QuizCardProps) => {
  return (
    <Box>
      <Flex>
        <Textarea
          w={400}
          h={200}
          defaultValue={props.title}
          isReadOnly
          mr={4}
        ></Textarea>
        <Textarea
          w={400}
          h={200}
          defaultValue={props.text}
          isReadOnly
        ></Textarea>
        <Checkbox>mark for review</Checkbox>
      </Flex>
    </Box>
  );
};

export default QuizCard;

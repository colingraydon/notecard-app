import { Flex, Box } from "@chakra-ui/react";
import React from "react";
import { NavBar } from "../components/NavBar";
import NewNotecard from "../components/NewNotecard";
import QuizWrapper from "../components/quiz/QuizWrapper";
import FullSidebar from "../components/sidebar/FullSidebar";
import { withApollo } from "../utils/withApollo";

interface quizProps {}

const quiz: React.FC<quizProps> = ({}) => {
  return (
    <Flex>
      <FullSidebar></FullSidebar>
      <Box w="100%">
        <NavBar></NavBar>
        <QuizWrapper></QuizWrapper>
      </Box>
    </Flex>
  );
};

export default withApollo({ ssr: false })(quiz);

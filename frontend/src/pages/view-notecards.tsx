import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { NavBar } from "../components/NavBar";
import FullSidebar from "../components/sidebar/FullSidebar";
import { SubjectSelect } from "../components/SubjectSelect";
import { SubjectSelectWrapper } from "../components/SubjectSelectWrapper";
import { withApollo } from "../utils/withApollo";

interface viewNotecardsProps {}

const viewNotecards: React.FC<viewNotecardsProps> = ({}) => {
  return (
    <Flex>
      <FullSidebar></FullSidebar>
      <Box w="100%">
        <NavBar></NavBar>
        <SubjectSelectWrapper></SubjectSelectWrapper>
      </Box>
    </Flex>
  );
};

export default withApollo({ ssr: false })(viewNotecards);

import { Box, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { NavBar } from "../components/NavBar";
import NewNotecard from "../components/notecard/NewNotecard";
import FullSidebar from "../components/sidebar/FullSidebar";
import { SubjectSelect } from "../components/SubjectSelect";
import { useMeQuery } from "../generated/graphql";
import useIsAuth from "../utils/useIsAuth";
import { withApollo } from "../utils/withApollo";

interface createNotecardsProps {}

const createNotecards: React.FC<createNotecardsProps> = ({}) => {
  const { data, loading } = useMeQuery();
  const router = useRouter();
  //custom hook that checks authorization using MeQuery
  useIsAuth();

  return (
    <Flex>
      <FullSidebar></FullSidebar>
      <Box w="100%">
        <NavBar></NavBar>
        <Box ml={8} mt={8}>
          <NewNotecard></NewNotecard>
        </Box>
      </Box>
    </Flex>
  );
};

export default withApollo({ ssr: false })(createNotecards);

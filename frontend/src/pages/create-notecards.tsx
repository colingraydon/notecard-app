import { Box, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { NewNavBar } from "../components/NewNavBar";
import NewNotecard from "../components/NewNotecard";
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
        <NewNavBar></NewNavBar>
        <Flex ml={8} mt={8} align="center"></Flex>
        <NewNotecard></NewNotecard>
      </Box>
    </Flex>
  );
};

export default withApollo({ ssr: false })(createNotecards);
import { Box, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { NavBar } from "../components/navbar/NavBar";
import NewNotecard from "../components/notecard/NewNotecard";
import FullSidebar from "../components/sidebar/FullSidebar";
import { useMeQuery } from "../generated/graphql";
import useIsAuth from "../utils/useIsAuth";
import { withApollo } from "../utils/withApollo";

interface createNotecardsProps {}

const createNotecards: React.FC<createNotecardsProps> = ({}) => {
  const { data, loading } = useMeQuery();
  const router = useRouter();
  //custom hook that checks authorization using MeQuery
  useIsAuth();

  //stores state for darkmode and collapse
  const [items, setItems] = useState([{ collapse: true, darkMode: false }]);

  //on page load, accesses local storage, sets items if there is data
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("items"));
    if (data) {
      setItems(data);
    }
  }, []);

  //modifies collapse and setsState
  const handleCollapse = () => {
    const collapse = items[0].collapse;
    const darkMode = items[0].darkMode;
    setItems([{ collapse: !collapse, darkMode: darkMode }]);
  };

  //when items are updated, local storage is set
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  return (
    <Flex>
      <FullSidebar
        collapse={items[0]?.collapse}
        handleCollapse={handleCollapse}
      ></FullSidebar>
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

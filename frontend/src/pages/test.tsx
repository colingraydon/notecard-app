import { Flex, Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import FullSidebar from "../components/sidebar/FullSidebar";
import { withApollo } from "../utils/withApollo";

interface testProps {}

const test: React.FC<testProps> = ({}) => {
  const [items, setItems] = useState([]);
  const [collapse, setCollapse] = useState(false);
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
    console.log("items: ", items);
  }, [items]);
  return (
    <Flex>
      <FullSidebar></FullSidebar>
      <Box w="100%">
        <NavBar></NavBar>
        <Box>{items}</Box>
      </Box>
    </Flex>
  );
};

export default withApollo({ ssr: false })(test);

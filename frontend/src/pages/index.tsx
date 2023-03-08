import { Box, Flex, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { NavBar } from "../components/navbar/NavBar";
import FullSidebar from "../components/sidebar/FullSidebar";
import { useMeQuery } from "../generated/graphql";
import NewWaves from "../styles/icons/NewWaves";
import { withApollo } from "../utils/withApollo";
// import {imageSource} from "../public/svg.png"
const Index = () => {
  //this would be used if the contextprovider was used.
  // const collapse = useCollapseContext();
  // const setStoredCollapse = useSetCollapseContext();

  // const handleCollapse = () => {
  //   setStoredCollapse(!collapse);
  // };

  const { data, loading } = useMeQuery();

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
    console.log("items: ", items);
  }, [items]);

  return (
    <Box>
      <Flex>
        <FullSidebar
          collapse={items[0].collapse}
          handleCollapse={handleCollapse}
        ></FullSidebar>
        <Box
          w="100%"
          // backgroundImage={"linear-gradient(to bottom right, red, yellow);"}
        >
          <NavBar></NavBar>
          <Box mt={12} ml={12}>
            {data?.me ? "hello, " : "log in to get started"}
          </Box>
          {/* <Box height={400} minHeight={400} maxHeight={400} mt="auto"> */}
          <Flex
            mt="auto"
            height={400}
            minHeight={400}
            maxHeight={400}
            position="absolute"
            bottom="0"
          >
            <NewWaves />
            {/* <Image as={NewWaves} mt="auto" display="block" /> */}
            {/* <Image src="../public/svg.png" /> */}
          </Flex>
          {/* </Box> */}

          <Box bg="tomato" h="20" w="1000"></Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default withApollo({ ssr: false })(Index);

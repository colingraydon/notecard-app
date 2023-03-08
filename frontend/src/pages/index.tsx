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
        <Box w="100%">
          <NavBar></NavBar>
          <Box
            bgGradient="linear(to-b, purple.300, blue.300)"
            // style={{
            //   backgroundImage: "linear-gradient(to bottom right, , yellow)",
            // }}
          >
            <Flex maxH="calc(100vh - 107px)" minH="calc(100vh - 107px)">
              <Box
                height={350}
                minHeight={350}
                maxHeight={350}
                mt="auto"
                width="100%"
              >
                <NewWaves />
              </Box>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default withApollo({ ssr: false })(Index);

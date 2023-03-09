import {
  Box,
  Container,
  Flex,
  Image,
  ListItem,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";
import { url } from "inspector";
import { useEffect, useState } from "react";
import { NavBar } from "../components/navbar/NavBar";
import QuizCard from "../components/quiz/QuizCard";
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
          <Box>
            <Box mt={8}>
              <Box
                fontSize={54}
                ml="auto"
                mr="auto"
                w="100%"
                textAlign="center"
              >
                studying made simple
              </Box>
              <Box textAlign="center" fontSize={20}>
                create subjects. make notecards. quiz yourself. it's that easy.
              </Box>

              <Flex mt={4}>
                <Box m="auto">
                  <QuizCard
                    title="Marie Curie"
                    text="Born in 1867. A physicist and chemist notable for her work on radioactivity. Only person to receive a Nobel prize in two different fields."
                    handleCheckChange={() => void 0}
                    cardId={-1}
                  ></QuizCard>
                </Box>
              </Flex>
            </Box>

            <Flex
              maxH="calc(100vh - 561px)"
              minH="calc(100vh - 561px)"
              mt="auto"

              // bg="teal"
            >
              <Box
                // maxH="calc(100vh - 545px)"
                // minH="calc(100vh - 545px)"
                // mt="auto"
                width="100%"
                mt="auto"
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

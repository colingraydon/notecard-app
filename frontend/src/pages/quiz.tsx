import { Flex, Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import NewNotecard from "../components/notecard/NewNotecard";
import QuizWrapper from "../components/quiz/QuizWrapper";
import FullSidebar from "../components/sidebar/FullSidebar";
import { withApollo } from "../utils/withApollo";

interface quizProps {}

const quiz: React.FC<quizProps> = ({}) => {
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
    <Flex>
      <FullSidebar
        collapse={items[0]?.collapse}
        handleCollapse={handleCollapse}
      ></FullSidebar>
      <Box w="100%">
        <NavBar></NavBar>
        <QuizWrapper></QuizWrapper>
      </Box>
    </Flex>
  );
};

export default withApollo({ ssr: false })(quiz);

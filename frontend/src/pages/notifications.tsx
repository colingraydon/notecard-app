import { Box, Flex } from "@chakra-ui/react";
import { useState, useEffect } from "react";

import { NavBar } from "../components/NavBar";
import NotificationWrapper from "../components/notifications/NotificationWrapper";
import FullSidebarNotification from "../components/sidebar/FullSidebarNotification";
import { withApollo } from "../utils/withApollo";

interface notificationsProps {}

const quiz: React.FC<notificationsProps> = ({}) => {
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
      <FullSidebarNotification
        collapse={items[0]?.collapse}
        handleCollapse={handleCollapse}
      ></FullSidebarNotification>
      <Box w="100%">
        <NavBar></NavBar>
        <NotificationWrapper></NotificationWrapper>
      </Box>
    </Flex>
  );
};

export default withApollo({ ssr: false })(quiz);

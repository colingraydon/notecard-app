import { Box, Flex } from "@chakra-ui/react";

import { NavBar } from "../components/NavBar";
import NotificationWrapper from "../components/notifications/NotificationWrapper";
import FullSidebarNotification from "../components/sidebar/FullSidebarNotification";
import { withApollo } from "../utils/withApollo";

interface notificationsProps {}

const quiz: React.FC<notificationsProps> = ({}) => {
  return (
    <Flex>
      <FullSidebarNotification></FullSidebarNotification>
      <Box w="100%">
        <NavBar></NavBar>
        <NotificationWrapper></NotificationWrapper>
      </Box>
    </Flex>
  );
};

export default withApollo({ ssr: false })(quiz);

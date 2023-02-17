import { Box, Flex } from "@chakra-ui/react";
import { NavBar } from "../components/NavBar";
import FullSidebar from "../components/sidebar/FullSidebar";
import { Sidebar } from "../components/sidebar/Sidebar";
import { withApollo } from "../utils/withApollo";
import { NewNavBar } from "../components/NewNavBar";

const Index = () => {
  return (
    // <Box>
    //   <Box
    //     height="100vh"
    //     padding={4}
    //     position="fixed"
    //     borderRadius={12}
    //     borderLeftRadius={0}
    //     backgroundColor="gray"
    //     w={300}
    //   >
    //     <Sidebar collapse={true} />
    //   </Box>
    //   {/* <NavBar></NavBar> */}
    // </Box>

    <Flex>
      <FullSidebar></FullSidebar>
      <NewNavBar></NewNavBar>
    </Flex>
  );
};

export default withApollo({ ssr: true })(Index);

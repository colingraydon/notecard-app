import { Box, Flex } from "@chakra-ui/react";
import { NavBar } from "../components/NavBar";
import { Sidebar } from "../components/sidebar/Sidebar";
import { withApollo } from "../utils/withApollo";

const Index = () => {
  return (
    <Box>
      <Box
        height="100vh"
        padding={4}
        borderRadius={12}
        borderLeftRadius={0}
        backgroundColor="gray"
        w={300}
      >
        <Sidebar collapse={true} />
      </Box>
      <NavBar></NavBar>
    </Box>
  );
};

export default withApollo({ ssr: true })(Index);

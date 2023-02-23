import { Flex } from "@chakra-ui/react";
import { NavBar } from "../components/NavBar";
import FullSidebar from "../components/sidebar/FullSidebar";
import { withApollo } from "../utils/withApollo";

const Index = () => {
  return (
    <Flex>
      <FullSidebar></FullSidebar>
      <NavBar></NavBar>
    </Flex>
  );
};

export default withApollo({ ssr: true })(Index);

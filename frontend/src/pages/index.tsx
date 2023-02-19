import { Flex } from "@chakra-ui/react";
import { NewNavBar } from "../components/NewNavBar";
import FullSidebar from "../components/sidebar/FullSidebar";
import { withApollo } from "../utils/withApollo";

const Index = () => {
  return (
    <Flex>
      <FullSidebar></FullSidebar>
      <NewNavBar></NewNavBar>
    </Flex>
  );
};

export default withApollo({ ssr: true })(Index);

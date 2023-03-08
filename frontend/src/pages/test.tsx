import { Box, Flex } from "@chakra-ui/react";
import { withApollo } from "../utils/withApollo";

const Test = () => {
  return (
    <Flex bg="teal" h="100vh">
      <Box fontSize={40} mt="auto">
        hi
      </Box>
    </Flex>
  );
};

export default withApollo({ ssr: false })(Test);

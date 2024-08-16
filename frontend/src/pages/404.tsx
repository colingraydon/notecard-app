import { Box, Flex, Heading, Link } from "@chakra-ui/react";
import React from "react";
import { withApollo } from "../utils/withApollo";
import NextLink from "next/link";

const NotFound = () => {
  return (
    <Flex
      w="100%"
      h="100vh"
      textAlign="center"
      justifyContent="center"
      direction="column"
      pb={80}
    >
      <Heading>404 error</Heading>
      <Box mt={8}>not sure how you ended up here.</Box>
      {/* <Box mt={4}>
        <Link as={NextLink} href="/">
          click me to get back to studying!
        </Link>
      </Box> */}
    </Flex>
  );
};

export default withApollo({ ssr: false })(NotFound);

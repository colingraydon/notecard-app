import { Box } from "@chakra-ui/react";
import React from "react";
import LoginForm from "../components/login/LoginForm";
import LoginPopoverForm from "../components/login/LoginPopoverForm";
import { withApollo } from "../utils/withApollo";

interface loginTestProps {}

const loginTest: React.FC<loginTestProps> = ({}) => {
  return (
    <Box>
      <Box>hello world</Box>
      <LoginPopoverForm />
    </Box>
  );
};

export default withApollo({ ssr: false })(loginTest);

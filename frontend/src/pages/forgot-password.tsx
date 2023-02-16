import { Box, Button, Flex } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { useForgotPasswordMutation } from "../generated/graphql";
import { withApollo } from "../utils/withApollo";

const forgotPassword: React.FC<{}> = ({}) => {
  const [complete, setComplete] = useState(false);
  const [forgotPassword] = useForgotPasswordMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async (values) => {
          await forgotPassword({ variables: values });
          setComplete(true);
        }}
      >
        {({ isSubmitting }) =>
          complete ? (
            <Box>
              if an account with that email exists, we sent you an email.
            </Box>
          ) : (
            <Form>
              <InputField
                name="email"
                placeholder="email"
                label="email"
                type="email"
              />
              <Flex>
                <Button
                  type="submit"
                  mr={2}
                  mt={6}
                  background="teal"
                  isLoading={isSubmitting}
                >
                  Forgot Password
                </Button>
              </Flex>
            </Form>
          )
        }
      </Formik>
    </Wrapper>
  );
};

export default withApollo({ ssr: false })(forgotPassword);

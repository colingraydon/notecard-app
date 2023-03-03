import { Box, Button, Flex, Link } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { InputField } from "../components/input/InputField";
import { Wrapper } from "../components/input/Wrapper";
import { useForgotPasswordMutation } from "../generated/graphql";
import { withApollo } from "../utils/withApollo";
import NextLink from "next/link";
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
                  forgot password
                </Button>
              </Flex>
            </Form>
          )
        }
      </Formik>
      <Box mt={8}>
        <Link as={NextLink} href="/">
          click here to get back to studying
        </Link>
      </Box>
    </Wrapper>
  );
};

export default withApollo({ ssr: false })(forgotPassword);

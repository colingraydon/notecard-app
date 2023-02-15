import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Box,
  Button,
  Link,
  Flex,
} from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import {
  MeDocument,
  MeQuery,
  useLoginMutation,
  useRegisterMutation,
} from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { withApollo } from "../utils/withApollo";

interface registerProps {}

const Login: React.FC<{}> = ({}) => {
  //needed to fix hydration
  // const [isServer, setIsServer] = useState(true);
  // useEffect(() => setIsServer(false), []);

  //next.js router
  const router = useRouter();
  //react hook. useRegisterMutation codegened the graphql mutation
  const [login] = useLoginMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login({
            variables: values,
            update: (cache, { data }) => {
              //pass in me query for type defs
              cache.writeQuery<MeQuery>({
                query: MeDocument,
                //get data, result of the register, sticking the cache with me query.
                data: {
                  __typename: "Query",
                  me: data?.login.user,
                },
              }),
                cache.evict({ fieldName: "posts:{}" });
            },
          });
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
            //if there is another route queued, push to that route
            if (typeof router.query.next === "string") {
              router.push(router.query.next);
            }
            //else push to homepage
            else {
              router.push("/");
            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="usernameOrEmail"
              placeholder="username or email"
              label="Username or Email"
            />
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
            </Box>
            <Flex>
              <Button
                type="submit"
                mr={2}
                mt={6}
                background="teal"
                isLoading={isSubmitting}
              >
                Login
              </Button>

              <Link ml="auto" mt={2} href="/forgot-password">
                forgot password?
              </Link>
            </Flex>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withApollo({ ssr: false })(Login);

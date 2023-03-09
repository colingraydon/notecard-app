import { Box, Button, ButtonGroup, Flex, Link, Stack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import NextLink from "next/link";
import { useRouter } from "next/router";
import {
  MeDocument,
  MeEmailDocument,
  MeEmailQuery,
  MeQuery,
  useLoginMutation,
} from "../../generated/graphql";
import { clickGreen, green, hoverGreen } from "../../styles/themes/Lightmode";
import { toErrorMap } from "../../utils/toErrorMap";
import { InputField } from "../input/InputField";

const LoginForm = ({ firstFieldRef, onCancel }) => {
  //next.js router
  const router = useRouter();
  const [login] = useLoginMutation();
  return (
    <Stack spacing={4}>
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
                cache.writeQuery<MeEmailQuery>({
                  query: MeEmailDocument,
                  //get data, result of the register, sticking the cache with me query.
                  data: {
                    __typename: "Query",
                    meEmail: data?.login.user,
                  },
                }),
                cache.evict({ fieldName: "subject" });
              //evicts all old notifications from cache
              cache.evict({ fieldName: "getNotifications" });
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
              label="username or email"
            />
            <InputField
              name="password"
              placeholder="password"
              label="password"
              type="password"
            />
            <Box mt={2} mb={2}>
              <Flex>
                <Box ml="auto">
                  <Link as={NextLink} href="/forgot-password">
                    forgot password?
                  </Link>
                </Box>
              </Flex>
            </Box>
            <ButtonGroup display="flex" justifyContent="flex-end">
              <Button variant="outline" onClick={onCancel}>
                cancel
              </Button>
              <Button
                background={green}
                _hover={{ background: hoverGreen }}
                _active={{ background: clickGreen }}
                type="submit"
              >
                login
              </Button>
            </ButtonGroup>
          </Form>
        )}
      </Formik>
    </Stack>
  );
};

export default LoginForm;

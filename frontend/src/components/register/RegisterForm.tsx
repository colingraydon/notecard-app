import { Stack, ButtonGroup, Button, Link, Box, Flex } from "@chakra-ui/react";
import NextLink from "next/link";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import {
  useLoginMutation,
  MeQuery,
  MeDocument,
  useRegisterMutation,
} from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
import { InputField } from "../input/InputField";

const RegisterForm = ({ firstFieldRef, onCancel }) => {
  //next.js router
  const router = useRouter();
  //react hook. useRegisterMutation codegened the graphql mutation
  const [register] = useRegisterMutation();
  return (
    <Stack spacing={4}>
      <Formik
        initialValues={{ email: "", username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register({
            variables: { options: values },
            update: (cache, { data }) => {
              //pass in me query for type defs
              cache.writeQuery<MeQuery>({
                query: MeDocument,
                //get data, result of the register, sticking the cache with me query.
                data: {
                  __typename: "Query",
                  me: data?.register.user,
                },
              });
            },
          });
          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));
          } else if (response.data?.register.user) {
            //it worked
            //nav to landing page
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="username"
              placeholder="username"
              label="Username"
            />
            <InputField name="email" placeholder="email" label="Email" />

            <InputField
              name="password"
              placeholder="password"
              label="Password"
              type="password"
            />
            <Flex>
              <Box mt={2} mb={2} ml="auto">
                we will never share your email.
              </Box>
            </Flex>
            <ButtonGroup mt={2} display="flex" justifyContent="flex-end">
              <Button variant="outline" onClick={onCancel}>
                cancel
              </Button>
              <Button colorScheme="teal" type="submit">
                register
              </Button>
            </ButtonGroup>
          </Form>
        )}
      </Formik>
    </Stack>
  );
};

export default RegisterForm;

import { Box, Button, Flex } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { useCreateSubjectMutation, useMeQuery } from "../generated/graphql";
import useIsAuth from "../utils/useIsAuth";
import { withApollo } from "../utils/withApollo";

const createPost: React.FC<{}> = ({}) => {
  //must consider state of me query, as it will be false while loading
  const { data, loading } = useMeQuery();
  const router = useRouter();
  //custom hook that checks authorization using MeQuery
  useIsAuth();
  const [createSubject] = useCreateSubjectMutation();
  return (
    <Layout variant="small">
      <Formik
        initialValues={{ title: "" }}
        onSubmit={async (values, { setErrors }) => {
          const { errors } = await createSubject({
            variables: { input: values.title },
            //updateing apollo cache
            update: (cache) => {
              //evicting a query, on the root query, put in posts
              cache.evict({ fieldName: "posts" });
            },
          });
          if (!errors) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="title" placeholder="title" label="Title" />
            <Box mt={4}>
              <InputField
                name="text"
                placeholder="text..."
                label="Body"
                textArea
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
                create post
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withApollo({ ssr: false })(createPost);

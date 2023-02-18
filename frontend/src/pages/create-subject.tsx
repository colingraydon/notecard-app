import { Box, Button, Flex } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import FullSidebar from "../components/sidebar/FullSidebar";
import { SubjectSelect } from "../components/SubjectSelect";
import { useCreateSubjectMutation, useMeQuery } from "../generated/graphql";
import useIsAuth from "../utils/useIsAuth";
import { withApollo } from "../utils/withApollo";

const createSubject: React.FC<{}> = ({}) => {
  //must consider state of me query, as it will be false while loading
  const { data, loading } = useMeQuery();
  const router = useRouter();
  //custom hook that checks authorization using MeQuery
  useIsAuth();
  const [createSubject] = useCreateSubjectMutation();
  return (
    <Flex>
      <FullSidebar></FullSidebar>
      <Layout variant="small">
        <Formik
          initialValues={{ subject: "" }}
          onSubmit={async (values, { setErrors }) => {
            const { errors } = await createSubject({
              variables: { input: values.subject },
              //updateing apollo cache
              update: (cache) => {
                //evicting a query, on the root query, put in posts
                cache.evict({ fieldName: "subject" });
              },
            });
            console.log("values: ", values);
            if (!errors) {
              router.push("/");
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField
                name="subject"
                placeholder="subject"
                label="Subject"
              />
              <Flex>
                <Button
                  type="submit"
                  mr={2}
                  mt={6}
                  background="teal"
                  isLoading={isSubmitting}
                >
                  create subject
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
        <SubjectSelect></SubjectSelect>
      </Layout>
    </Flex>
  );
};

export default withApollo({ ssr: false })(createSubject);

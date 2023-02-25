import {
  Box,
  Button,
  CircularProgress,
  Flex,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import { NavBar } from "../components/NavBar";
import FullSidebar from "../components/sidebar/FullSidebar";
import SingleSubject from "../components/subject/SingleSubject";
import {
  useCreateSubjectMutation,
  useGetSubjectsQuery,
  useMeQuery,
} from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import useIsAuth from "../utils/useIsAuth";
import { withApollo } from "../utils/withApollo";

const createSubject: React.FC<{}> = ({}) => {
  //must consider state of me query, as it will be false while loading
  const { data, loading } = useMeQuery();
  const router = useRouter();
  //custom hook that checks authorization using MeQuery
  useIsAuth();
  const [createSubject] = useCreateSubjectMutation();
  const { data: dataSub, error, loading: loadingSub } = useGetSubjectsQuery();
  const toast = useToast();
  return (
    <Flex>
      <FullSidebar></FullSidebar>
      <Box w="100%">
        <NavBar></NavBar>
        <Box p={4}>
          <Formik
            initialValues={{ subject: "" }}
            onSubmit={async (values, { setErrors }) => {
              const response = await createSubject({
                variables: { input: values.subject },
                //updateing apollo cache
                update: (cache) => {
                  //evicting a query, on the root query, put in posts
                  cache.evict({ fieldName: "subject" });
                },
              });

              if (response.data?.createSubject.errors) {
                setErrors(toErrorMap(response.data.createSubject.errors));
              } else {
                toast({
                  title: "subject created.",
                  description: "get started by creating notecards!",
                  status: "success",
                  duration: 3000,
                  isClosable: true,
                });
              }
            }}
          >
            {({ isSubmitting }) => (
              <Box>
                <Form>
                  <Flex align="end">
                    <Box w={250} mr={10}>
                      <InputField
                        name="subject"
                        placeholder="subject"
                        label="Subject"
                      />
                    </Box>
                    <Box>
                      <Button
                        type="submit"
                        background="teal"
                        isLoading={isSubmitting}
                      >
                        create subject
                      </Button>
                    </Box>
                  </Flex>
                </Form>
              </Box>
            )}
          </Formik>

          {!dataSub && loadingSub ? (
            <CircularProgress isIndeterminate value={50} />
          ) : (
            <Stack spacing={8}>
              {dataSub!.getSubjects.map((s) =>
                !s ? null : (
                  <SingleSubject
                    name={s.name}
                    id={s.id}
                    prevScore={s.prevScore}
                    prevTime={s.prevTime}
                    updatedAt={s.updatedAt}
                    key={s.id}
                  />
                )
              )}
            </Stack>
          )}
        </Box>
      </Box>
    </Flex>
  );
};

export default withApollo({ ssr: false })(createSubject);

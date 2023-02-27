import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Flex,
  Heading,
  Link,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik, isNaN } from "formik";
import { useRouter } from "next/router";
import React from "react";
import {
  useCreateCardMutation,
  useGetSubjectsQuery,
  useMeQuery,
} from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
import useIsAuth from "../../utils/useIsAuth";
import { InputField } from "../InputField";
import { InputFieldSelect } from "../InputFieldSelect";
import NextLink from "next/link";

interface NewNotecardProps {}

const NewNotecard: React.FC<NewNotecardProps> = ({}) => {
  const { data, loading } = useMeQuery();
  const router = useRouter();
  useIsAuth();

  const { data: dataSub, error, loading: loadingSub } = useGetSubjectsQuery();
  const subjects = dataSub?.getSubjects;

  const [createNotecards] = useCreateCardMutation();
  const toast = useToast();
  return (
    <Box>
      <Heading ml={4} mb={4}>
        create notecards
      </Heading>
      {loading || loadingSub ? (
        <CircularProgress isIndeterminate value={50} />
      ) : (
        <Box ml={4}>
          <Formik
            initialValues={{ title: "", text: "", subId: undefined }}
            onSubmit={async (values, { setErrors }) => {
              const tempSID: number = parseInt(values.subId);
              let newValues = {
                title: values.title,
                text: values.text,
                subId: tempSID,
              };
              if (isNaN(tempSID)) {
                newValues = {
                  title: values.title,
                  text: values.text,
                  subId: 0,
                };
              }

              const response = await createNotecards({
                variables: { input: newValues },
              });

              if (response.data?.createCard.errors) {
                setErrors(toErrorMap(response.data.createCard.errors));
              } else {
                toast({
                  title: "notecard created",
                  description: "we've created the notecard for you",
                  status: "success",
                  duration: 2000,
                  isClosable: true,
                });
              }
              //     //updateing apollo cache
              //     update: (cache) => {
              //         //evicting a query, on the root query, put in cards
              //         cache.evict({fieldName: "card"})
              //     }
            }}
          >
            {({ isSubmitting }) => (
              <Box>
                <Form>
                  <Box w={280}>
                    <InputFieldSelect
                      name="subId"
                      placeholder="choose a subject..."
                      label="subject"
                      options={subjects}
                      type="number"
                    />
                  </Box>
                  {subjects.length === 0 && (
                    <Box mt={12}>
                      <Link as={NextLink} href="/create-subject">
                        create subjects to get started.
                      </Link>
                    </Box>
                  )}

                  <Flex mt={8}>
                    <Box>
                      <InputField
                        name="title"
                        placeholder="front"
                        label="front"
                        textArea
                      />
                    </Box>

                    <Box mr={6} ml={6} mt={8}>
                      <Divider orientation="vertical" />
                    </Box>
                    <Box w={400}>
                      <InputField
                        name="text"
                        placeholder="back"
                        label="back"
                        textArea
                      />
                    </Box>
                  </Flex>
                  <Flex>
                    <Button
                      type="submit"
                      mr={2}
                      mt={6}
                      background="teal"
                      isLoading={isSubmitting}
                    >
                      create card
                    </Button>
                  </Flex>
                </Form>
              </Box>
            )}
          </Formik>
        </Box>
      )}
    </Box>
  );
};

export default NewNotecard;

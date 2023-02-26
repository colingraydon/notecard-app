import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Textarea,
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

interface NewNotecardProps {}

const NewNotecard: React.FC<NewNotecardProps> = ({}) => {
  const { data, loading } = useMeQuery();
  const router = useRouter();
  useIsAuth();

  const { data: dataSub, error, loading: loadingSub } = useGetSubjectsQuery();
  const subjects = dataSub?.getSubjects;

  const [createNotecards] = useCreateCardMutation();

  return (
    <Box>
      {loading || loadingSub ? (
        <CircularProgress isIndeterminate value={50} />
      ) : (
        <Box>
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
                  <Box w={400}>
                    <InputFieldSelect
                      name="subId"
                      placeholder="choose a subject..."
                      label="subject"
                      options={subjects}
                      type="number"
                    />
                  </Box>

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

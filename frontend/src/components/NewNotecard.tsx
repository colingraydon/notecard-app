import { Box, Button, CircularProgress, Flex } from "@chakra-ui/react";
import { Form, Formik, isNaN } from "formik";
import { useRouter } from "next/router";
import React from "react";
import {
  useCreateCardMutation,
  useGetSubjectsQuery,
  useMeQuery,
} from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import useIsAuth from "../utils/useIsAuth";
import { InputField } from "./InputField";
import { InputFieldSelect } from "./InputFieldSelect";

interface NewNotecardProps {}

const NewNotecard: React.FC<NewNotecardProps> = ({}) => {
  const { data, loading } = useMeQuery();
  const router = useRouter();
  useIsAuth();

  const { data: dataSub, error, loading: loadingSub } = useGetSubjectsQuery();
  // const [value, setValue] = useState(undefined);
  const subjects = dataSub?.getSubjects;

  const [createNotecards] = useCreateCardMutation();

  interface inValues {
    title: string;
    text: string;
    subId: number;
  }
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
              // console.log("typeof tempSID: ", typeof tempSID);
              // console.log("typeof newValues.subId ", typeof newValues.subId);
              if (isNaN(tempSID)) {
                newValues = {
                  title: values.title,
                  text: values.text,
                  subId: 0,
                };
              }
              console.log("newValues: ", newValues);

              const response = await createNotecards({
                //CHANGE THIS, just for testing
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
              // })
            }}
          >
            {({ isSubmitting }) => (
              <Box w={400}>
                <Form>
                  <InputFieldSelect
                    name="subId"
                    placeholder="choose a subject..."
                    label="subject"
                    options={subjects}
                    type="number"
                  />
                  <InputField
                    name="title"
                    placeholder="front"
                    label="Front"
                    textArea
                  />
                  <Box mt={4}>
                    <InputField
                      name="text"
                      placeholder="back"
                      label="Back"
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

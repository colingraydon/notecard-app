import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";
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
        <Box>loading...</Box>
      ) : (
        <Box>
          <Formik
            initialValues={{ title: "", text: "", subId: undefined }}
            onSubmit={async (values, { setErrors }) => {
              console.log("values: ", values);
              const tempSID: number = parseInt(values.subId);
              const newValues = {
                title: values.title,
                text: values.text,
                subId: tempSID,
              };
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
              //         cache.evict({fieldName: "cards"})
              //     }
              // })
              // if (!errors){
              //     router.push('/');
              // }
            }}
          >
            {({ isSubmitting }) => (
              <Box w={400}>
                <Form>
                  {/* <FormControl>
                    <FormLabel>Subject</FormLabel>
                    <Select
                      name="subject"
                      id="subject"
                      placeholder="select a subject"
                      onChange={(e) => {
                        setValue(e.target.value);
                        console.log("e.target.value: ", e.target.value);
                        console.log("value: ", value);
                        setValue(e.target.value);
                      }}
                      value={value}
                    >
                      {subjects.map((item, key) => (
                        <option
                          onClick={() => {
                            setValue(item.id);
                            console.log("item.name: ", item.name);
                            console.log("value: ", value);
                          }}
                          key={key}
                        >
                          {item.name}
                        </option>
                      ))}
                    </Select>
                  </FormControl> */}
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

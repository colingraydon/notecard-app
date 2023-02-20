import { Box, Button, Flex } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import router, { useRouter } from "next/router";
import React from "react";
import { useCreateCardMutation, useMeQuery } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import useIsAuth from "../utils/useIsAuth";
import { withApollo } from "../utils/withApollo";
import { InputField } from "./InputField";

interface NewNotecardProps {}

const NewNotecard: React.FC<NewNotecardProps> = ({}) => {
  const { data, loading } = useMeQuery();
  const router = useRouter();
  useIsAuth();
  const [createNotecards] = useCreateCardMutation();
  //to be used for tracking state of menu select

  return (
    <Formik
      initialValues={{ title: "", text: "" }}
      onSubmit={async (values, { setErrors }) => {
        const response = await createNotecards({
          //CHANGE THIS, just for testing
          variables: { input: values, id: 191 },
        });
        console.log("response: ", response);
        console.log(
          "response.data.createCard.errors: ",
          response.data.createCard.errors
        );
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
  );
};

export default NewNotecard;

// response.data.createCard.errors:
// [{…}]
// 0
// :
// {field: 'back', message: 'back cannot be empty', __typename: 'FieldError'}
// length
// :
// 1
// [[Prototype]]
// :
// Array(0)

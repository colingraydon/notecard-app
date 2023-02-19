import { Box, Button, Flex } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import router, { useRouter } from "next/router";
import React from "react";
import { useCreateCardMutation, useMeQuery } from "../generated/graphql";
import useIsAuth from "../utils/useIsAuth";
import { withApollo } from "../utils/withApollo";
import { InputField } from "./InputField";

interface NewNotecardProps {}

const NewNotecard: React.FC<NewNotecardProps> = ({}) => {
  const { data, loading } = useMeQuery();
  const router = useRouter();
  useIsAuth();
  const [createNotecards] = useCreateCardMutation();

  return (
    <Formik
      initialValues={{ title: "", text: "" }}
      onSubmit={async (values, { setErrors }) => {
        const;
        // const {errors} = await createPost({
        //     variables: {input: values},
        //     //updateing apollo cache
        //     update: (cache) => {
        //         //evicting a query, on the root query, put in posts
        //         cache.evict({fieldName: "posts"})
        //     }
        // })
        // if (!errors){
        //     router.push('/');
        // }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <InputField name="front" placeholder="front" label="Front" textArea />
          <Box mt={4}>
            <InputField name="back" placeholder="back" label="Back" textArea />
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
      )}
    </Formik>
  );
};

export default NewNotecard;

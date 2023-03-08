import {
  Box,
  Button,
  CircularProgress,
  Flex,
  Heading,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { InputField } from "../components/input/InputField";
import { NavBar } from "../components/navbar/NavBar";
import FullSidebar from "../components/sidebar/FullSidebar";
import SingleSubject from "../components/subject/SingleSubject";
import {
  useCreateSubjectMutation,
  useDeleteSubjectMutation,
  useGetSubjectsQuery,
  useMeQuery,
} from "../generated/graphql";
import {
  blue,
  clickGreen,
  green,
  hoverGreen,
} from "../styles/themes/Lightmode";
import { toErrorMap } from "../utils/toErrorMap";
import useIsAuth from "../utils/useIsAuth";
import { withApollo } from "../utils/withApollo";

const createSubject: React.FC<{}> = ({}) => {
  //must consider state of me query, as it will be false while loading

  useIsAuth();
  const router = useRouter();
  const { data: dataMe, loading: loadingMe } = useMeQuery();

  // if (!dataMe?.me && !loadingMe) {
  //   router.push("/");
  // }
  //custom hook that checks authorization using MeQuery

  const [createSubject] = useCreateSubjectMutation();

  const [subjects, setSubjects] = useState([]);
  const { data, error, loading } = useGetSubjectsQuery();

  useEffect(() => {
    if (data) {
      setSubjects(data.getSubjects);
    }
  }, [data]);

  const handleCreateSubject = (sub) => {
    setSubjects([...subjects, sub]);
  };

  const [deleteSubject] = useDeleteSubjectMutation();
  const handleDeleteSubject = (id: number) => {
    deleteSubject({
      variables: { id },
      update: (cache) => {
        cache.evict({ fieldName: "getSubjects" });
      },
    });
    setSubjects([...subjects.filter((s) => s.id !== id)]);
  };

  //stores state for darkmode and collapse
  const [items, setItems] = useState([{ collapse: true, darkMode: false }]);

  //on page load, accesses local storage, sets items if there is data
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("items"));
    if (data) {
      setItems(data);
    }
  }, []);

  //modifies collapse and setsState
  const handleCollapse = () => {
    const collapse = items[0].collapse;
    const darkMode = items[0].darkMode;
    setItems([{ collapse: !collapse, darkMode: darkMode }]);
  };

  //when items are updated, local storage is set
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const toast = useToast();
  return (
    <Flex>
      <FullSidebar
        collapse={items[0]?.collapse}
        handleCollapse={handleCollapse}
      ></FullSidebar>
      <Box w="100%">
        <NavBar></NavBar>
        <Box p={8} ml={4}>
          <Heading>subjects</Heading>
          {!dataMe?.me ? (
            <Box>loading...</Box>
          ) : (
            <Box mt={4}>
              <Formik
                initialValues={{ subject: "" }}
                onSubmit={async (values, { setErrors }) => {
                  const response = await createSubject({
                    variables: { input: values.subject },
                    //updateing apollo cache
                    update: (cache) => {
                      //evicting a query, on the root query, put in subjects
                      cache.evict({ fieldName: "getSubjects" });
                      // cache.gc();
                    },
                  });

                  if (response.data?.createSubject.errors) {
                    setErrors(toErrorMap(response.data.createSubject.errors));
                  } else {
                    toast({
                      title: "subject created.",
                      description: "get started by creating notecards!",
                      status: "success",
                      duration: 2000,
                      isClosable: true,
                    });
                  }

                  handleCreateSubject(response.data?.createSubject.subject);
                }}
              >
                {({ isSubmitting }) => (
                  <Box>
                    <Form>
                      <Box>
                        <Flex>
                          <Box w={280} mr={10} minH={105} maxH={105} pb={8}>
                            <InputField
                              name="subject"
                              placeholder="subject"
                              label="Subject"
                            />
                          </Box>

                          <Box pt="31px">
                            <Button
                              type="submit"
                              isLoading={isSubmitting}
                              background={green}
                              _hover={{ background: hoverGreen }}
                              _active={{ background: clickGreen }}
                              boxShadow="xl"
                            >
                              create subject
                            </Button>
                          </Box>
                        </Flex>
                      </Box>
                    </Form>
                  </Box>
                )}
              </Formik>
            </Box>
          )}
          {!data?.getSubjects && loading ? (
            <CircularProgress isIndeterminate value={50} />
          ) : (
            <Stack spacing={8}>
              {subjects?.map((s) =>
                !s ? null : (
                  <SingleSubject
                    handleDeleteSubject={handleDeleteSubject}
                    name={s.name}
                    id={s.id}
                    prevScore={s.prevScore}
                    prevTime={s.prevTime}
                    updatedAt={s.updatedAt}
                    key={s.id}
                    numCards={s.cards?.length}
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

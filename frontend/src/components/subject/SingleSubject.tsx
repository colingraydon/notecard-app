import { Box, Divider, Flex, Input } from "@chakra-ui/react";
import React, { ChangeEvent, useEffect, useState } from "react";
import {
  useDeleteSubjectMutation,
  useUpdateSubjectMutation,
} from "../../generated/graphql";
import SubjectDelete from "./SubjectDelete";
import SubjectEdit from "./SubjectEdit";

interface SingleSubjectProps {
  name: string;
  id: number;
  prevScore: number;
  prevTime: number;
  updatedAt: string;
  numCards: number;
  handleDeleteSubject: (id: number) => void;
}

const SingleSubject: React.FC<SingleSubjectProps> = (
  props: SingleSubjectProps
) => {
  const [readableDate] = useState(
    new Date(parseInt(props.updatedAt)).toDateString()
  );

  const [parsedTime] = useState({
    minutes: Math.floor(props.prevTime / 60),
    seconds: props.prevTime - Math.floor(props.prevTime / 60) * 60,
  });

  //used for handling locking and unlocking for editing
  const [lockState, setLockState] = useState(true);

  const handleLockState = () => {
    setLockState(!lockState);
  };

  // const [deleteSubject] = useDeleteSubjectMutation();
  // const handleDelete = (id: number) => {
  //   deleteSubject({
  //     variables: { id },
  //   });
  // };

  const [nameState, setNameState] = useState(props.name);
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNameState(e.target.value);
  };
  return (
    <Box mt={8}>
      <Box w={1100} borderRadius={12} border="solid" borderWidth={1}>
        <Box>
          <Flex>
            <Box ml={4} w={300} pt={2} pb={2} mt={2}>
              {lockState ? (
                <Box>{nameState}</Box>
              ) : (
                <Input onChange={handleNameChange} size="sm" />
              )}
            </Box>
            <Box>
              <Divider orientation="vertical" />
            </Box>

            <Box pb={2} mr={2} mt={2}>
              <Flex>
                <SubjectDelete
                  id={props.id}
                  handleDeleteSubject={props.handleDeleteSubject}
                />
                <SubjectEdit
                  name={nameState}
                  lockState={lockState}
                  id={props.id}
                  prevScore={props.prevScore}
                  prevTime={props.prevTime}
                  handleLockState={handleLockState}
                  handleNameChange={handleNameChange}
                />
              </Flex>
            </Box>
            <Box>
              <Divider orientation="vertical" />
            </Box>
            <Box w={100} pt={2} pb={2} ml={4} mt={2}>
              <Flex>
                <Box>cards: </Box>
                <Box ml="auto">{props.numCards}</Box>
              </Flex>
            </Box>
            <Box ml={2}>
              <Divider orientation="vertical" />
            </Box>
            <Box w={250} pt={2} pb={2} ml={4} mt={2}>
              <Flex>
                <Box>updated: </Box>
                <Box ml="auto">{readableDate}</Box>
              </Flex>
            </Box>
            <Box ml={2}>
              <Divider orientation="vertical" />
            </Box>

            <Box w={150} ml={4} pt={2} pb={2} mt={2}>
              <Flex>
                <Box>last time: </Box>
                {props.prevTime !== null && (
                  <Box ml="auto">
                    <Flex>
                      {!isNaN(parsedTime.minutes) && (
                        <Box>{parsedTime.minutes}:</Box>
                      )}
                      {parsedTime.seconds < 10
                        ? !isNaN(parsedTime.seconds) && (
                            <Box>0{parsedTime.seconds}</Box>
                          )
                        : !isNaN(parsedTime.seconds) && (
                            <Box>{parsedTime.seconds}</Box>
                          )}
                    </Flex>
                  </Box>
                )}
              </Flex>
            </Box>
            <Box ml={2}>
              <Divider orientation="vertical" />
            </Box>
            <Box w={150} ml={4} pt={2} pb={2} mr={4} mt={2}>
              <Flex>
                <Box>last score: </Box>
                {props.prevScore !== null && !isNaN(props.prevScore) && (
                  <Box ml="auto">{props.prevScore}%</Box>
                )}
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default SingleSubject;

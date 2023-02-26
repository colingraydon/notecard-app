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

  const [deleteSubject] = useDeleteSubjectMutation();
  const handleDelete = (id: number) => {
    deleteSubject({
      variables: { id },
    });
  };

  const [nameState, setNameState] = useState(props.name);
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNameState(e.target.value);
  };
  return (
    <Box>
      <Box w={960} mt={8} borderRadius={12} border="solid" borderWidth={1}>
        <Box>
          <Flex>
            <Box ml={4} w={250} pt={2} pb={2}>
              {lockState ? (
                <Box>{nameState}</Box>
              ) : (
                <Input onChange={handleNameChange} size="sm" />
              )}
            </Box>
            <Box>
              <Divider orientation="vertical" />
            </Box>

            <Box pb={2} mr={2}>
              <Flex>
                <SubjectDelete id={props.id} handleDelete={handleDelete} />
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
            <Box w={250} pt={2} pb={2} ml={4}>
              <Flex>
                <Box>updated: </Box>
                <Box ml="auto">{readableDate}</Box>
              </Flex>
            </Box>

            <Box ml={2}>
              <Divider orientation="vertical" />
            </Box>
            <Box w={170} ml={4} pt={2} pb={2}>
              <Flex>
                <Box>previous time: </Box>
                {props.prevTime !== null && (
                  <Box ml="auto">
                    <Flex>
                      <Box>{parsedTime.minutes}:</Box>
                      {parsedTime.seconds < 10 ? (
                        <Box>0{parsedTime.seconds}</Box>
                      ) : (
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
            <Box w={200} ml={4} pt={2} pb={2} mr={4}>
              <Flex>
                <Box>previous score: </Box>
                {props.prevScore !== null && (
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

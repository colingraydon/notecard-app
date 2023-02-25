import { Box, Divider, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDeleteSubjectMutation } from "../generated/graphql";
import SubjectEditDelete from "./SubjectEditDelete";

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
  const [readableDate, setReadableDate] = useState(
    new Date(parseInt(props.updatedAt)).toDateString()
  );

  useEffect(() => {
    const newDate = new Date(props.updatedAt).toDateString();
    setReadableDate(readableDate);
    console.log("readableDate: ", readableDate);
  }, [props.updatedAt]);

  const [parsedTime, setParsedTime] = useState({
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
  return (
    <Box>
      <Box w={960} mt={8} borderRadius={12} border="solid" borderWidth={1}>
        <Box>
          <Flex>
            <Box ml={4} w={250} pt={2} pb={2}>
              {props.name}
            </Box>
            <Box>
              <Divider orientation="vertical" />
            </Box>

            <Box pb={2} mr={2}>
              <SubjectEditDelete
                name={props.name}
                key={props.id}
                id={props.id}
                lockState={lockState}
                handleLockState={handleLockState}
                prevScore={props.prevScore}
                prevTime={props.prevTime}
                handleDelete={handleDelete}
              />
            </Box>
            <Box>
              <Divider orientation="vertical" />
            </Box>
            <Box w={250} pt={2} pb={2} ml={4}>
              <Flex>
                <Box>last updated: </Box>
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

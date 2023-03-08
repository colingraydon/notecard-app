import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useUpdateSubjectMutation } from "../../generated/graphql";
import { useRouter } from "next/navigation";
import QuizResults from "./QuizResults";
import {
  green,
  hoverGreen,
  clickGreen,
  blue,
  clickBlue,
  hoverBlue,
} from "../../styles/themes/Lightmode";
interface QuizSidebarProps {
  prevScore: number;
  prevTime: number;
  started: boolean;
  score: number;
  id: number;
  name: string;
  hasCards: number;
  handleStarted: () => void;
}

const QuizSidebar: React.FC<QuizSidebarProps> = (props: QuizSidebarProps) => {
  const router = useRouter();
  /* ****************used for timer********/
  const [time, setTime] = React.useState({
    minutes: 0,
    seconds: 0,
  });

  const tick = () => {
    if (props.started) {
      if (time.seconds === 59) {
        setTime({ minutes: time.minutes + 1, seconds: 0 });
      } else {
        setTime({
          minutes: time.minutes,
          seconds: time.seconds + 1,
        });
      }
    }
  };

  useEffect(() => {
    const timerId = setInterval(() => tick(), 1000);
    return () => clearInterval(timerId);
  });
  /* *************************************/

  /**********used to convert props of previous time*********/
  const [prevStringTime, setPrevStringTime] = useState({
    seconds: props.prevTime % 60,
    minutes: (props.prevTime - (props.prevTime % 60)) / 60,
  });

  useEffect(() => {
    setPrevStringTime({
      seconds: props.prevTime % 60,
      minutes: (props.prevTime - (props.prevTime % 60)) / 60,
    });
  }, [props.hasCards]);
  /**********************************************/

  const [updateSubject] = useUpdateSubjectMutation();

  //necessary to control state of modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box position="sticky" top={55} height="1" zIndex="0" pr={2}>
      {props.hasCards === 0 ? null : (
        <Box>
          <Box h={8}></Box>
          <Box
            p={3}
            w={200}
            border="solid"
            borderRadius={12}
            borderWidth={1}
            boxShadow="xl"
          >
            <Flex>
              <Box fontSize={28} textAlign="end">
                {`${time.minutes.toString().padStart(2, "0")}:${time.seconds
                  .toString()
                  .padStart(2, "0")}`}
              </Box>

              <Box ml="auto">
                <Box>
                  <Button
                    background={!props.started ? "gray.200" : green}
                    boxShadow="xl"
                    _hover={{
                      background: !props.started ? "gray.200" : hoverGreen,
                    }}
                    _active={{
                      background: !props.started ? "gray.200" : clickGreen,
                    }}
                    isDisabled={!props.started}
                    onClick={() => {
                      onOpen();
                      props.handleStarted();
                      updateSubject({
                        variables: {
                          input: {
                            id: props.id,
                            name: props.name,
                            prevTime: time.minutes * 60 + time.seconds,
                            prevScore: props.score,
                          },
                        },
                      });
                    }}
                  >
                    submit
                  </Button>

                  <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>results</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        <QuizResults
                          prevSeconds={prevStringTime.seconds}
                          prevMinutes={prevStringTime.minutes}
                          prevScore={props.prevScore}
                          currSeconds={time.seconds}
                          currMinutes={time.minutes}
                          currScore={props.score}
                        />
                      </ModalBody>

                      <ModalFooter>
                        <Button
                          variant="ghost"
                          boxShadow="xl"
                          mr={3}
                          onClick={onClose}
                        >
                          close
                        </Button>
                        <Button
                          boxShadow="xl"
                          background={blue}
                          _hover={{ background: hoverBlue }}
                          _active={{ background: clickBlue }}
                          onClick={() => router.refresh()}
                        >
                          try again
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </Box>
              </Box>
            </Flex>
          </Box>
          {props.prevScore === null ? null : (
            <Box
              p={3}
              border="solid"
              borderRadius={12}
              borderWidth={1}
              mt={4}
              boxShadow="xl"
            >
              {props.prevScore === null ? null : (
                <Flex>
                  <Box>previous score: </Box>
                  <Box ml="auto" color="gray.400">
                    {props.prevScore}%
                  </Box>
                </Flex>
              )}
              {props.prevTime === null ? null : (
                <Flex>
                  <Box mt={4}>previous time:</Box>
                  <Box mt={4} ml="auto" color="gray.400">
                    {prevStringTime.minutes}:
                    {prevStringTime.seconds < 10 ? "0" : null}
                    {prevStringTime.seconds}
                  </Box>
                </Flex>
              )}
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default QuizSidebar;

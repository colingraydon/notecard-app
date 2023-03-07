import { Box } from "@chakra-ui/react";
import React from "react";
import { blue } from "../../themes/Lightmode";

interface SingleNotificationProps {
  text: string;
  id: number;
  createdAt: string;
  read: boolean;
}

const SingleNotification: React.FC<SingleNotificationProps> = (
  props: SingleNotificationProps
) => {
  return (
    <Box>
      <Box
        w={1000}
        borderRadius={12}
        border="solid"
        borderWidth="1px"
        _hover={{ borderColor: blue }}
      >
        <Box my={4} ml={4}>
          <Box>{props.text}</Box>
          <Box mt={2}>{new Date(parseInt(props.createdAt)).toDateString()}</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SingleNotification;

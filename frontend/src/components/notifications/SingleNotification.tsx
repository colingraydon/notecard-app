import { Box } from "@chakra-ui/react";
import React from "react";

interface SingleNotificationProps {
  text: string;
  id: number;
  createdAt: string;
  read: boolean;
}

const SingleNotification: React.FC<SingleNotificationProps> = (
  props: SingleNotificationProps
) => {
  console.log("props: ", props);
  return (
    <Box>
      <Box>{props.text}</Box>
      <Box>{props.read}</Box>
      <Box>{new Date(parseInt(props.createdAt)).toDateString()}</Box>
    </Box>
  );
};

export default SingleNotification;

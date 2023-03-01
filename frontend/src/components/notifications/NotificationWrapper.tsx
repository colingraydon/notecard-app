import { Box, CircularProgress, Heading, Stack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useGetNotificationsQuery } from "../../generated/graphql";
import SingleSubject from "../subject/SingleSubject";
import SingleNotification from "./SingleNotification";

interface NotificationWrapperProps {}

const NotificationWrapper: React.FC<NotificationWrapperProps> = ({}) => {
  const [notifications, setNotifications] = useState([]);
  const { data, loading, error } = useGetNotificationsQuery();

  useEffect(() => {
    if (data) {
      setNotifications(data.getNotifications);
      console.log("notifications: ", notifications);
    }
  }, [data]);
  return (
    <Box ml={12}>
      <Heading mt={8}>notifications</Heading>
      {!data && loading ? (
        <CircularProgress isIndeterminate value={50} />
      ) : (
        <Stack spacing={8} mt={12}>
          {notifications?.map((n) =>
            !n ? null : (
              <SingleNotification
                text={n.text}
                id={n.id}
                createdAt={n.createdAt}
                key={n.id}
                read={n.read}
              />
            )
          )}
        </Stack>
      )}
      <Box></Box>
    </Box>
  );
};

export default NotificationWrapper;

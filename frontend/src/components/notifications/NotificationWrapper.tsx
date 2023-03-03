import { Box, CircularProgress, Heading, Stack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  GetNotificationsDocument,
  GetNotificationsQuery,
  useGetNotificationsQuery,
  useUpdateNotificationMutation,
} from "../../generated/graphql";
import SingleNotification from "./SingleNotification";

interface NotificationWrapperProps {}

const NotificationWrapper: React.FC<NotificationWrapperProps> = ({}) => {
  const [notifications, setNotifications] = useState([]);
  const { data, loading, error } = useGetNotificationsQuery();
  const [updateNotification] = useUpdateNotificationMutation();

  useEffect(() => {
    if (data) {
      setNotifications(data.getNotifications);
      console.log("notifications: ", notifications);
      data.getNotifications.forEach((n) => {
        updateNotification({
          variables: {
            id: n.id,
            read: true,
          },
          // update: (cache) => {
          //   cache.evict({ fieldName: "getNotifications" });
          // },
        });
      });
    }
  }, [data]);

  //marks all notifications as read
  // if (data) {
  //   data.getNotifications.forEach((n) => {
  //     updateNotification({
  //       variables: {
  //         id: n.id,
  //         read: true,
  //       },
  //     });
  //   });
  // }

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
      <Box pb={12}></Box>
    </Box>
  );
};

export default NotificationWrapper;

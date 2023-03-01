import { Box, List, ListItem } from "@chakra-ui/react";
import { useState } from "react";
import {
  MdCalendarToday,
  MdEditNote,
  MdOutlineArticle,
  MdOutlineCreate,
  MdOutlineNotificationsActive,
  MdOutlineQuiz,
  MdOutlineSettingsInputComposite,
  MdOutlineSpaceDashboard,
} from "react-icons/md";
import { useGetNotificationsQuery } from "../../../generated/graphql";
import { NavItem } from "./NavItem";

export const Navigation = ({ collapse }) => {
  const { data, loading, error } = useGetNotificationsQuery();

  const numUnread = data?.getNotifications.filter((s) => !s.read);

  const [isActive, setisActive] = useState(false);

  const items = [
    {
      type: "link",
      label: "subjects",
      icon: MdOutlineCreate,
      path: "/create-subject",
    },

    {
      type: "link",
      label: "create notecards",
      icon: MdEditNote,
      path: "/create-notecards",
    },
    {
      type: "link",
      label: "view notecards",
      icon: MdOutlineArticle,
      path: "/view-notecards",
    },
    {
      type: "link",
      label: "quiz",
      icon: MdOutlineQuiz,
      path: "/quiz",
    },
    {
      type: "border",
    },
    {
      type: "header",
      label: "account",
    },

    {
      type: "link",
      label: "notifications",
      icon: MdOutlineNotificationsActive,
      path: "/notifications",
      notifications: numUnread?.length,
    },

    {
      type: "link",
      label: "settings",
      icon: MdOutlineSettingsInputComposite,
      path: "/",
    },
  ];
  return (
    <Box>
      <List w="full" my={8}>
        {items.map((item, index) => (
          <ListItem key={index}>
            <NavItem item={item} isActive={isActive} collapse={collapse} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

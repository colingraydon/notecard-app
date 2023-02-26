import { List, ListItem } from "@chakra-ui/react";
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
import { NavItem } from "./NavItem";

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
    type: "header",
    label: "Account",
  },

  {
    type: "link",
    label: "notifications",
    icon: MdOutlineNotificationsActive,
    path: "/",
    notifications: 0,
  },

  {
    type: "link",
    label: "settings",
    icon: MdOutlineSettingsInputComposite,
    path: "/",
  },
];

export const Navigation = ({ collapse }) => (
  <List w="full" my={8}>
    {items.map((item, index) => (
      <ListItem key={index}>
        <NavItem item={item} isActive={index === 0} collapse={collapse} />
      </ListItem>
    ))}
  </List>
);

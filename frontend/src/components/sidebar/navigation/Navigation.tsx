import { IconProps, List, ListItem, Text } from "@chakra-ui/react";
import {
  MdOutlineSpaceDashboard,
  MdOutlineShoppingBag,
  MdMailOutline,
  MdOutlineFlag,
  MdCalendarToday,
  MdOutlineSupervisorAccount,
  MdOutlineSettingsInputComposite,
  MdOutlineChatBubbleOutline,
  MdOutlineNotificationsActive,
} from "react-icons/md";
import { DarkModeSwitch } from "../../DarkModeSwitch";
import { NavItem } from "./NavItem";

const items = [
  {
    type: "link",
    label: "subjects",
    icon: MdOutlineSpaceDashboard,
    path: "/create-subject",
  },
  {
    type: "link",
    label: "manage subjects",
    icon: MdOutlineShoppingBag,
    path: "/",
  },

  {
    type: "link",
    label: "notecards",
    icon: MdCalendarToday,
    path: "/",
  },
  {
    type: "link",
    label: "manage notecards",
    icon: MdOutlineSupervisorAccount,
    path: "/",
  },
  {
    type: "link",
    label: "quiz",
    icon: MdOutlineFlag,
    path: "/",
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
    notifications: 24,
  },

  {
    type: "link",
    label: "settings",
    icon: MdOutlineSettingsInputComposite,
    path: "/",
  },
];

export const Navigation = ({ collapse }) => (
  <List w="full" my={8} mb={300}>
    {items.map((item, index) => (
      <ListItem key={index}>
        <NavItem item={item} isActive={index === 0} collapse={collapse} />
      </ListItem>
    ))}
  </List>
);

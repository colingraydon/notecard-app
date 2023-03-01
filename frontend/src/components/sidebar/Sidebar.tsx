import { Box } from "@chakra-ui/react";
import React from "react";
import { Navigation } from "./navigation/Navigation";

interface SidebarProps {
  collapse: boolean;
  hideNotifications?: boolean;
}

export const Sidebar = (props: SidebarProps) => (
  <React.Fragment>
    <Box w="full" ml={props.collapse ? 2 : 0}>
      <Navigation
        hideNotifications={props.hideNotifications}
        collapse={props.collapse}
      />
    </Box>
  </React.Fragment>
);

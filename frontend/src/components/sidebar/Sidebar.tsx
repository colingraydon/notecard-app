import React from "react";
import { Box } from "@chakra-ui/react";
import { AvatarBox } from "./AvatarBox";
import { Logo } from "./Logo";
import { Navigation } from "./navigation/Navigation";
import { SwitchButtons } from "./SwitchButtons";
import { DarkModeSwitch } from "../DarkModeSwitch";

export const Sidebar = ({ collapse }) => (
  <React.Fragment>
    <Box w="full">
      <Navigation collapse={collapse} />
    </Box>
    {/* <AvatarBox collapse={collapse} /> */}
  </React.Fragment>
);

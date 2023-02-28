import { Box } from "@chakra-ui/react";
import React from "react";
import { Navigation } from "./navigation/Navigation";

export const Sidebar = ({ collapse }) => (
  <React.Fragment>
    <Box w="full" ml={collapse ? 2 : 0}>
      <Navigation collapse={collapse} />
    </Box>
  </React.Fragment>
);

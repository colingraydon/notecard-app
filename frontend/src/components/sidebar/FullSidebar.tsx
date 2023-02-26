import { Box, Flex, HStack, IconButton, Text } from "@chakra-ui/react";
import React from "react";
import { MdMenu } from "react-icons/md";
import { NavBar } from "../NavBar";
import { AvatarBox } from "./AvatarBox";
import { Logo } from "./Logo";
import { Navigation } from "./navigation/Navigation";
import { Sidebar } from "./Sidebar";
import { SwitchButtons } from "./SwitchButtons";

const FullSidebar = () => {
  const [collapse, setCollapse] = React.useState(true);

  return (
    <Box position="sticky" top="0" height="1" zIndex="1">
      <HStack w="full" h="100vh" bg="gray.100">
        <Flex
          as="aside"
          w="full"
          h="full"
          maxW={collapse ? 300 : 100}
          minW={collapse ? 300 : 100}
          bg="white"
          padding={6}
          flexDirection="column"
          borderRadius="12px"
        >
          <Flex
            display="flex"
            transition="ease-in-out .2s"
            justifyContent="center"
            alignItems="center"
          >
            <Box alignContent="center">
              <Logo collapse={collapse} />
            </Box>
            <IconButton
              aria-label="Menu Collapse"
              icon={<MdMenu />}
              justifyContent="center"
              alignContent="center"
              onClick={() => setCollapse(!collapse)}
            />
          </Flex>
          <Sidebar collapse={collapse} />
          <Box mt="auto">
            <AvatarBox collapse={collapse} />
          </Box>
        </Flex>
        <Flex>
          <Flex
            as="main"
            w="full"
            h="full"
            bg="white"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            position="relative"
            borderRadius="12px"
          ></Flex>
        </Flex>
      </HStack>
    </Box>
  );
};

export default FullSidebar;

import { Box, Flex, HStack, IconButton, Text } from "@chakra-ui/react";
import React from "react";
import { MdMenu } from "react-icons/md";
import { NewNavBar } from "../NewNavBar";
import { AvatarBox } from "./AvatarBox";
import { Logo } from "./Logo";
import { Navigation } from "./navigation/Navigation";
import { Sidebar } from "./Sidebar";
import { SwitchButtons } from "./SwitchButtons";

const FullSidebar = () => {
  const [collapse, setCollapse] = React.useState(true);

  return (
    <Flex>
      <HStack w="full" h="100vh" bg="gray.100" padding={4}>
        <Flex
          as="aside"
          w="full"
          h="full"
          maxW={collapse ? 300 : 100}
          minW={collapse ? 300 : 100}
          bg="white"
          alignItems="start"
          padding={6}
          flexDirection="column"
          justifyContent="space-between"
          transition="ease-in-out .2s"
          borderRadius="12px"
        >
          <Flex>
            <Box ml="auto">
              <Logo collapse={collapse} />
            </Box>
            <IconButton
              aria-label="Menu Collapse"
              icon={<MdMenu />}
              marginLeft="auto"
              onClick={() => setCollapse(!collapse)}
            />
          </Flex>
          <Sidebar collapse={collapse} />
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
    </Flex>
  );
};

export default FullSidebar;

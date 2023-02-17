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
          maxW={collapse ? 350 : 100}
          bg="white"
          alignItems="start"
          padding={6}
          flexDirection="column"
          justifyContent="space-between"
          transition="ease-in-out .2s"
          borderRadius="12px"
        >
          <Sidebar collapse={collapse} />
        </Flex>
        {/* <Flex>
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
        >
          <IconButton
            aria-label="Menu Collapse"
            icon={<MdMenu />}
            position="absolute"
            top={2}
            left={2}
            onClick={() => setCollapse(!collapse)}
          />
          <Text fontSize={100} color="gray.300"></Text>
        </Flex>
      </Flex> */}
      </HStack>
    </Flex>
  );
};

export default FullSidebar;

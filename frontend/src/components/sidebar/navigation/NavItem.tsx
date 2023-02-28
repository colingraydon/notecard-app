import Link from "next/link";
import {
  ListIcon,
  Link as LinkChakra,
  Heading,
  Box,
  Badge,
  Text,
} from "@chakra-ui/react";
import React from "react";

export const NavItem = ({ item, isActive, collapse }) => {
  const { label } = item;

  if (item.type === "link") {
    const { icon, notifications, messages, path } = item;
    return (
      <Box
        display="flex"
        alignItems="center"
        my={6}
        justifyContent="center"
        mb={!collapse ? 6 : 0}
        minH={25}
      >
        <LinkChakra
          href={path}
          as={Link}
          gap={1}
          display="flex"
          alignItems="center"
          _hover={{ textDecoration: "none", color: "black" }}
          fontWeight="medium"
          color={isActive ? "black" : "gray.400"}
          w="full"
          justifyContent={!collapse ? "center" : ""}
        >
          <ListIcon as={icon} fontSize={22} m="0" />
          {collapse && <Text>{label}</Text>}
        </LinkChakra>
        {collapse && (
          <React.Fragment>
            {notifications > 0 && (
              <Badge
                borderRadius="full"
                colorScheme="yellow"
                w={6}
                textAlign="center"
              >
                {notifications}
              </Badge>
            )}
            {messages && (
              <Badge
                borderRadius="full"
                colorScheme="green"
                w={6}
                textAlign="center"
              >
                {messages}
              </Badge>
            )}
          </React.Fragment>
        )}
      </Box>
    );
  }
  return (
    <Heading
      color="gray.400"
      fontWeight="medium"
      textTransform="uppercase"
      fontSize="sm"
      borderTopWidth={1}
      borderColor="gray.100"
      //changed this
      pt={0}
      my={6}
    >
      <Text display={collapse ? "flex" : "none"}>{label}</Text>
    </Heading>
  );
};

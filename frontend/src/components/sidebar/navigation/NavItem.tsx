import Link from "next/link";
import {
  ListIcon,
  Link as LinkChakra,
  Heading,
  Box,
  Badge,
  Text,
  Divider,
  Tooltip,
  PopoverArrow,
  Button,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
} from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";
import { useMeQuery } from "../../../generated/graphql";

export const NavItem = ({ item, isActive, collapse, hideNotifications }) => {
  const { data, loading } = useMeQuery();
  const { label } = item;

  const router = useRouter();
  if (item.type === "border") {
    return <Divider w={collapse ? 60 : 6} ml={collapse ? 0 : 2}></Divider>;
  }
  if (item.type === "link") {
    const { icon, notifications, messages, path } = item;
    return (
      <Box
        display="flex"
        alignItems="center"
        my={6}
        justifyContent="center"
        minH={25}
      >
        <Tooltip label={label} isDisabled={collapse} placement="right">
          <LinkChakra
            href={data?.me || label === "about" ? path : "/"}
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
            <Box></Box>
            <ListIcon
              as={icon}
              fontSize={22}
              mb={0}
              ml={0}
              mr={0}
              mt={!collapse && item.label === "notifications" ? 1 : 0}
            />

            {collapse && <Text>{label}</Text>}
          </LinkChakra>
        </Tooltip>
        {collapse && (
          <React.Fragment>
            {(notifications === 0 || !hideNotifications) &&
              notifications !== 0 && (
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
      // borderTopWidth={1}
      borderColor="gray.100"
      pt={!collapse ? 15 : 0}
      my={6}
    >
      <Text display={collapse ? "flex" : "none"}>{label}</Text>
    </Heading>
  );
};

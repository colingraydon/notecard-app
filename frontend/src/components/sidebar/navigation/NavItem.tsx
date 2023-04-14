import {
  Badge,
  Box,
  Divider,
  Heading,
  Link as LinkChakra,
  ListIcon,
  Text,
  Tooltip,
  useColorMode,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useMeQuery } from "../../../generated/graphql";

export const NavItem = ({ item, isActive, collapse, hideNotifications }) => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const { data, loading } = useMeQuery();
  const { label } = item;

  const router = useRouter();
  if (item.type === "border") {
    return (
      <Divider
        borderColor="gray.300"
        w={collapse ? 60 : 8}
        ml={collapse ? 0 : 1}
      ></Divider>
    );
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
        <Tooltip
          label={
            !data?.me && label !== "about"
              ? "sign in or register to get started "
              : label
          }
          // isDisabled={collapse}
          placement="right"
          ml={collapse ? 3 : 0}
        >
          <LinkChakra
            href={data?.me || label === "about" ? path : "/"}
            as={Link}
            gap={1}
            display="flex"
            alignItems="center"
            _hover={{
              textDecoration: "none",
              color: isDark ? "white" : "black",
            }}
            fontWeight="medium"
            color={isActive ? "black" : "gray.400"}
            w="full"
            justifyContent={!collapse ? "center" : ""}
            mt={
              (!collapse && item.label === "notifications") ||
              item.label === "about"
                ? 0
                : 0
            }
          >
            <Box></Box>
            <ListIcon
              as={icon}
              fontSize={22}
              mb={0}
              ml={0}
              mr={0}
              // mt={
              //   (!collapse && item.label === "notifications") ||
              //   item.label === "about"
              //     ? 0
              //     : 0
              // }
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
                  backgroundColor="green.300"
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
      pt={!collapse ? "1.2em" : 0}
      my={6}
    >
      <Text display={collapse ? "flex" : "none"}>{label}</Text>
    </Heading>
  );
};

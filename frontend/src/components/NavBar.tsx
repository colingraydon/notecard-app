import { Flex, Button, Heading, Box, IconButton } from "@chakra-ui/react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { useApolloClient } from "@apollo/client";
import { isServerFn } from "../utils/isServer";
import {
  LogoutMutationVariables,
  useLogoutMutation,
  useMeQuery,
} from "../generated/graphql";
import { MdMenu } from "react-icons/md";
import { useState } from "react";
import { DarkModeSwitch } from "./DarkModeSwitch";

interface NavBarProps {}

//used to pass into logout function
let logoutVar: LogoutMutationVariables;

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const router = useRouter();
  // useEffect only runs in the browser, so just set state, which will rerender the page
  //needed to fix hydration errors
  // const [isServer, setIsServer] = useState(true);
  // useEffect(() => setIsServer(false), []);

  const [logout, { loading: logoutFetching }] = useLogoutMutation();

  //apollo client stuff
  const apollo = useApolloClient();
  const { data, loading } = useMeQuery({
    //pause stops the me query from being run if on the server
    //don't need if the cookie is passed from the client to next.js to graphql endpoint
    skip: isServerFn(),
  });

  // const [pause, setPause] = useState(true);
  // useEffect(() => { setPause(isServerFn()) }, []);
  // const [{ data, fetching }] = useMeQuery({ pause });

  let body = null;

  //data is loading
  if (loading) {
  }
  //user not logged in
  if (!data?.me) {
    body = (
      <>
        <NextLink style={{ marginRight: "5px" }} href="/login">
          login
        </NextLink>
        <NextLink href="register">register</NextLink>
      </>
    );
    //user is logged in
  } else {
    body = (
      <Flex>
        <Box mr={2}>{data.me.username}</Box>
        <Button
          isLoading={logoutFetching}
          variant="link"
          color="black"
          onClick={async () => {
            await logout(logoutVar);
            //refreshes cache
            await apollo.resetStore();
          }}
        >
          logout
        </Button>
      </Flex>
    );
  }
  return (
    <Flex
      w="100%"
      position="sticky"
      top="0"
      height="16"
      zIndex="1"
      bg="gray.100"
      pt="2"
    >
      <Flex
        height={10}
        bg="white"
        top={0}
        p={4}
        w="100%"
        borderRadius={12}
        padding={6}
      >
        <Flex align="center" flex={1}>
          <Box>a lightweight study tool</Box>
          <Box ml="auto" mr={2}>
            {body}
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

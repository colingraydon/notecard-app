import { useApolloClient } from "@apollo/client";
import {
  Box,
  Button,
  Flex,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import {
  LogoutMutationVariables,
  useLogoutMutation,
  useMeQuery,
} from "../../generated/graphql";
import {
  clickGreen,
  clickPurple,
  green,
  hoverGreen,
  hoverPurple,
  purple,
} from "../../styles/themes/Lightmode";
import { isServerFn } from "../../utils/isServer";

import LoginPopoverForm from "../login/LoginPopoverForm";
import RegisterPopoverForm from "../register/RegisterPopoverForm";
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

  const { colorMode } = useColorMode();

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
      <Flex>
        <Box mr={2}>
          <LoginPopoverForm />
        </Box>
        <Box>
          <RegisterPopoverForm />
        </Box>
      </Flex>
    );
    //user is logged in
  } else {
    body = (
      <Flex align="center">
        <Box mr={2}>{data.me.username}</Box>
        <Button
          isLoading={logoutFetching}
          background={purple}
          _hover={{ background: hoverPurple }}
          _active={{ background: clickPurple }}
          onClick={async () => {
            await router.push("/");
            await logout(logoutVar);
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
      h={14}
      zIndex="2"
      bg={useColorModeValue("gray.100", "gray.600")}
    >
      <Flex
        height={10}
        // bg="white"
        top={0}
        w="100%"
        borderRadius={12}
        pt={6}
        pb={6}
        pl={6}
        pr={2}
        bg={useColorModeValue("white", "gray.800")}
      >
        <Flex align="center" flex={1}>
          <Box>studying made simple</Box>

          <Box ml="auto" mr={2}>
            {body}
          </Box>
          <DarkModeSwitch />
        </Flex>
      </Flex>
    </Flex>
  );
};

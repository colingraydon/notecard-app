import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMeQuery } from "../generated/graphql";

//custom hook to check authoirzation globally, runs useMeQuery()
const useIsAuth = () => {
  //must consider state of me query, as it will be false while loading
  const { data, loading } = useMeQuery();
  const router = useRouter();
  console.log(router);
  useEffect(() => {
    //if there is no user and it is not fetching
    if (!data?.me && !loading) {
      //this will replace the route with the previous page, where it was routed from
      router.replace("/login?next=" + router.pathname);
    }
  }, [loading, data, router]);
};

export default useIsAuth;

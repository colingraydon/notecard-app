import { NavBar } from "../components/NavBar";
import { withApollo } from "../utils/withApollo";

const Index = () => {
  return <NavBar />;
};

export default withApollo({ ssr: true })(Index);

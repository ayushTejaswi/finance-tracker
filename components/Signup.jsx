import Header from "./Header";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../src/firebase";
import Signupin from "../components/Signinup";

const Signup = () => {
  const [user, loading] = useAuthState(auth);
  return (
    <div>
      <Header></Header>
      {!loading && (
        <div className="wrapper">
          <Signupin></Signupin>
        </div>
      )}
    </div>
  );
};

export default Signup;

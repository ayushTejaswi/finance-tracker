import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../src/firebase";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { toast } from "react-toastify";
import profile from "../src/assets/profile.svg";

import { signOut } from "firebase/auth";
const Header = () => {
  //if user is logged in then move to dashboard
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, loading]);

  const logFunc = () => {
    alert("Logout!");
    try {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          toast.success("Logged Out");
          navigate("/");
        })
        .catch((error) => {
          toast.error(error.message);
          // An error happened.
        });
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <>
      {loading ? (
        <Loading></Loading>
      ) : (
        <div className="navbar">
          <p className="bar">PennyWise</p>
          {user && (
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}
            >
              <img
                src={user.photoURL ? user.photoURL : profile}
                width="32px"
                height="32px"
                style={{ borderRadius: "50%", objectFit: "cover" }}
              />
              <p className="link" onClick={logFunc}>
                Logout
              </p>
            </div> //if user is present(logged in) then this will be present otherwise not
          )}
        </div>
      )}
    </>
  );
};

export default Header;

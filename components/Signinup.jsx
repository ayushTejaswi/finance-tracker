import { useState } from "react";
import Input from "./Input/Input";
import Button from "./Button";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { toast } from "react-toastify";
import { auth, db, provider } from "../src/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";

const Signinup = () => {
  //change all to use ref after completing this
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();

  const signupWithEmail = (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(name);
    console.log(email);
    console.log(password);
    console.log(confirmPass);
    if (name != "" && email != "" && password != "" && confirmPass != "") {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          toast.success("User Created");
          setLoading(false);
          setEmail("");
          setName("");
          setPass("");
          setConfirmPass("");
          console.log(user);
          createDoc(user);
          navigate("/dashboard");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          setLoading(false);
          // ..
        });
    } else if (password !== confirmPass) {
      toast.error("Password must be same");
      setLoading(false);
    } else {
      toast.error("All fields are mandatory");
      setLoading(false);
    }
  };
  const createDoc = async (user) => {
    //create doc with uid and make sure uid doesnt exist
    setLoading(true);
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);

    if (!userData.exists()) {
      try {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName ? user.displayName : name,
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : "", //dp of a person
          createdAt: new Date(),
        });
        toast.success("Doc Created");
        setLoading(false);
      } catch (e) {
        toast.error(e.message);
        setLoading(false);
      }
    }
  };

  const loginWithEmail = () => {
    setLoading(true);
    if (email != "" && password != "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          toast.success("Logged In");
          navigate("/dashboard");
          setLoading(false);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          setLoading(false);
        });
    } else {
      toast.error("All fields are mandatory");
      setLoading(false);
    }
  };

  const googleAuth = () => {
    setLoading(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        const user = result.user;
        navigate("/dashboard");
        toast.success("User Authenticated");
        createDoc(user);
        setLoading(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        const email = error.customData.email;

        const credential = GoogleAuthProvider.credentialFromError(error);
        toast.error(errorMessage);

        setLoading(false);
      });
  };

  return (
    <>
      {login ? (
        <div className="signupin-wrapper">
          <h2 className="title">
            Log In on <span style={{ color: "#2970ff" }}>PennyWise</span>
          </h2>
          <form>
            <Input
              label={"Email"}
              type={"email"}
              state={email}
              setState={setEmail}
              placeholder={"Enter your E-mail"}
            ></Input>
            <Input
              label={"Password"}
              type={"password"}
              state={password}
              setState={setPass}
              placeholder={"Enter your Password"}
            ></Input>
            <div className=" signinBtn">
              <Button
                disabled={loading}
                text={` ${
                  loading ? "Loading..." : "Log In with Email and Password"
                }`}
                flag={true}
                onClick={loginWithEmail}
              ></Button>
              <p style={{ margin: "10px" }}> or</p>
              <Button
                disabled={loading}
                onClick={googleAuth}
                text={` ${loading ? "Loading..." : "Log In with Google"}`}
                flag={false}
              ></Button>
              <p className="p-login">
                Don't Have An Account?{" "}
                <span
                  onClick={() => {
                    setLogin(!login);
                  }}
                  style={{
                    cursor: "pointer",
                    textDecoration: "underline",
                    color: "blue",
                  }}
                >
                  Click Here
                </span>
              </p>
            </div>
          </form>
        </div>
      ) : (
        <div className="signupin-wrapper">
          <h2 className="title">
            Sign Up on <span style={{ color: "#2970ff" }}>PennyWise</span>
          </h2>
          <form>
            <Input
              label={"Full Name"}
              state={name}
              type={"text"}
              setState={setName}
              placeholder={"Enter Name"}
            ></Input>
            <Input
              label={"Email"}
              type={"email"}
              state={email}
              setState={setEmail}
              placeholder={"Enter your E-mail"}
            ></Input>
            <Input
              label={"Password"}
              type={"password"}
              state={password}
              setState={setPass}
              placeholder={"Enter your Password"}
            ></Input>
            <Input
              label={"Confirm Password"}
              type={"password"}
              state={confirmPass}
              setState={setConfirmPass}
              placeholder={"Confirm your Password"}
            ></Input>
            <div className=" signinBtn">
              <Button
                disabled={loading}
                text={` ${
                  loading ? "Loading..." : "Sign Up with Email and Password"
                }`}
                flag={true}
                onClick={signupWithEmail}
              ></Button>
              <p style={{ margin: "10px" }}> or</p>
              <Button
                disabled={loading}
                text={` ${loading ? "Loading..." : "Sign Up with Google"}`}
                flag={false}
                onClick={googleAuth}
              ></Button>
              <p className="p-login">
                Or Have An Account Already?{" "}
                <span
                  onClick={() => {
                    setLogin(!login);
                  }}
                  style={{
                    cursor: "pointer",
                    textDecoration: "underline",
                    color: "blue",
                  }}
                >
                  Click Here
                </span>
              </p>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Signinup;

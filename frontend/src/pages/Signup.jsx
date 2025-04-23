import {Heading} from "../components/Heading";
import {SubHeading} from "../components/SubHeading";
import {InputBox} from "../components/InputBox";
import {Button} from "../components/Button";
import {BottomWarning} from "../components/BottomWarning";
import {useState} from "react";
import axios from "axios";

import {useNavigate} from "react-router-dom";

export function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/v1/user/signup", {
        email,
        firstName,
        lastName,
        password,
      });
      localStorage.setItem("token", res.data.token);

      if (res.status === 200) {
        setTimeout(() => {
          navigate("/dashboard"); // redirect to your target page
        }, 1000);
      }
    } catch (err) {
      console.error("Signin failed:", err);
    }
  };
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading lable={"Sign up"} />
          <SubHeading lable={"Enter your information to create an account"} />
          <InputBox
            lable={"First Name"}
            placeholder={"John"}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <InputBox
            lable={"Last Name"}
            placeholder={"Doe"}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
          <InputBox
            lable={"Email"}
            placeholder={"john@gmail.com"}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <InputBox
            lable={"Password"}
            placeholder={"123456"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div className="pt-4">
            <Button lable={"Sign up"} onClick={handleSignup}></Button>
          </div>
          <BottomWarning
            lable={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}></BottomWarning>
        </div>
      </div>
    </div>
  );
}

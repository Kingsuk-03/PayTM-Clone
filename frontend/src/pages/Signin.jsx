import {Heading} from "../components/Heading";
import {SubHeading} from "../components/SubHeading";
import {InputBox} from "../components/InputBox";
import {Button} from "../components/Button";
import {BottomWarning} from "../components/BottomWarning";
import {useState} from "react";
import axios from "axios";

import {useNavigate} from "react-router-dom";

export function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignin = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/v1/user/signin", {
        email,
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
          <Heading lable={"Sign in"} />
          <SubHeading lable={"Enter your credentials to access your account"} />
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
            <Button lable={"Sign in"} onClick={handleSignin}></Button>
          </div>
          <BottomWarning
            lable={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}></BottomWarning>
        </div>
      </div>
    </div>
  );
}

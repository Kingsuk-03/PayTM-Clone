import {Heading} from "../components/Heading";
import {SubHeading} from "../components/SubHeading";
import {InputBox} from "../components/InputBox";
import {Button} from "../components/Button";
import {BottomWarning} from "../components/BottomWarning";

export function Signup() {
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading lable={"Sign up"} />
          <SubHeading lable={"Enter your information to create an account"} />
          <InputBox lable={"First Name"} placeholder={"John"} />
          <InputBox lable={"Last Name"} placeholder={"Doe"} />
          <InputBox lable={"Email"} placeholder={"john@gmail.com"} />
          <InputBox lable={"Password"} placeholder={"123456"} />
          <div className="pt-4">
            <Button lable={"Sign up"}></Button>
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

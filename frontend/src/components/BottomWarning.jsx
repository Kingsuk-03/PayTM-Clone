import {Link} from "react-router-dom";

export function BottomWarning({lable, buttonText, to}) {
  return (
    <div className="flex justify-center text-sm py-2">
      <div>{lable}</div>
      <Link className="pointer underline pl-1 cursor-pointer" to={to}>
        {buttonText}
      </Link>
    </div>
  );
}

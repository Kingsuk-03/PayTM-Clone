import {Appbar} from "../components/Appbar";
import {Balance} from "../components/Balance";
import {Users} from "../components/Users";

export function Dashboard() {
  return (
    <div>
      <Appbar />
      <div className="m-8">
        <Balance />
      </div>
      <Users />
    </div>
  );
}

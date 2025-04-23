import axios from "axios";
import {useEffect, useState} from "react";

export function Balance() {
  const [balance, setBalance] = useState();

  useEffect(() => {
    const fetchBalance = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:3000/api/v1/account/balance",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBalance(response.data.balance);
    };

    fetchBalance();
  }, []);

  return (
    <div className="flex">
      <div className="font-bold text-lg">Your Balance 💵</div>
      <div className="font-semibold text-lg ml-4">{balance} Rs.</div>
    </div>
  );
}

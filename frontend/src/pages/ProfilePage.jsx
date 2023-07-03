import { useEffect } from "react";
import UserInfo from "../components/UserInfo";
import OrderHistory from "../components/OrderHistory";

export default function ProfilePage() {
  useEffect(() => {
    document.title = "Giftoday - Profile";
  }, []);
  return (
    <div className="ml-[10%] flex">
      <div className="ml-12 mt-20 w-1/2">
        <UserInfo />
      </div>
      <div className="mt-20 w-1/2">
        <OrderHistory />
      </div>
    </div>
  );
}

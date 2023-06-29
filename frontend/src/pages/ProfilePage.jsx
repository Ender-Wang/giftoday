import { useEffect } from "react";
import UserInfo from "../components/UserInfo";
import OrderHistory from "../components/OrderHistory";

export default function ProfilePage() {
  useEffect(() => {
    document.title = "Giftoday - Profile";
  }, []);
  return (
    <div className="flex">
      <div className="ml-12 mt-12 w-4/5">
        <UserInfo />
      </div>
      <div className="w-1/2">
        <OrderHistory />
      </div>
    </div>
  );
}

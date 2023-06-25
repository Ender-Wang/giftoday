import { useEffect } from "react";
import UserInfo from "../components/UserInfo";
import OrderHistory from "../components/OrderHistory";

export default function ProfilePage() {
  return (
    <div>
      <UserInfo />
      <OrderHistory />
    </div>
  );
}

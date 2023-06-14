import { useEffect } from "react";
import UserInfo from "../components/UserInfo";
import OrderHistory from "../components/OrderHistory";

export default function ProfilePage() {
  useEffect(() => {
    document.title = "Giftoday - User Profile";
  }, []);
  // return <UserInfo />;
  return <OrderHistory />;
}

import { useEffect } from "react";
import UserInfo from "../components/UserInfo";
import OrderHistory from "../components/OrderHistory";

export default function ProfilePage() {
  return (
    <div>
      <div className="flex flex-row">
        <div>
          <div className=" w-[400px]">
            <UserInfo />
          </div>
        </div>
        <div>
          <div className="w-[400px]">
            <OrderHistory />
          </div>
        </div>
      </div>
    </div>
  );
}

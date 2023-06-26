import { useEffect } from "react";
import UserInfo from "../components/UserInfo";
import OrderHistory from "../components/OrderHistory";

export default function ProfilePage() {
  return (
    <div class="flex">
      <div class="w-4/5">
        <div class="ml-12 mt-12">
          <UserInfo />
        </div>
      </div>
      <div class="w-1/2">
        {/* <div class="mr-20 "> */}
        <OrderHistory />
        {/* </div> */}
      </div>
    </div>
  );
}

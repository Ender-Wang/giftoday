import { useEffect } from "react";
import UserInfo from "../components/UserInfo";
import OrderHistory from "../components/OrderHistory";

export default function ProfilePage() {
  return (
    <div class="flex">
      <div class="w-4/5">
<<<<<<< HEAD
        <div class="ml-12 mt-12">
          <UserInfo />
=======
        <div>
          <div class="ml-12 mt-12">
            <UserInfo />
          </div>
        </div>
        <div class="w-1/2">
          {/* <div class="mr-20 "> */}
          <OrderHistory />
          {/* </div> */}
>>>>>>> parent of 3200ef4 (feat(ShopItem): add filter function)
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

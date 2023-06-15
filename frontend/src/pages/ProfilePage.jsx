import { useEffect } from "react";
import UserInfo from "../components/UserInfo";
import OrderHistory from "../components/OrderHistory";

export default function ProfilePage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "stretch",
        marginLeft: "50px",
      }}
    >
      <div
        style={{
          flex: "4 4 auto",
          marginTop: "25px",
        }}
      >
        {" "}
        <UserInfo />
      </div>
      <div
        style={{
          flex: "1 1 auto",
          marginTop: "-115px",
          marginLeft: "-300px",
          marginRight: "120px",
        }}
      >
        {" "}
        <OrderHistory />
      </div>
    </div>
  );
}

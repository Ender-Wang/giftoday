import UserInfo from "../components/UserInfo";
import OrderHistory from "../components/OrderHistory";

// export default function ProfilePage() {
//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "row", // 水平布局
//         justifyContent: "center", // 居中对齐
//         alignItems: "stretch", // 垂直方向上拉伸填充容器
//       }}
//     >
//       <div style={{ flex: "4 4 auto" }}>
//         {" "}
//         {/* 左侧组件 */}
//         <UserInfo />
//       </div>
//       <div style={{ flex: "1 1 auto", width: "50%", marginTop: "-100px" }}>
//         {" "}
//         {/* 右侧组件 */}
//         <OrderHistory />
//       </div>
//     </div>
//   );
// }
export default function ProfilePage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "stretch",
        marginLeft: "50px", // 向右平移50像素
      }}
    >
      <div
        style={{
          flex: "4 4 auto",
          marginTop: "25px",
        }}
      >
        {" "}
        {/* 左侧组件 */}
        <UserInfo />
      </div>
      <div
        style={{
          flex: "1 1 auto",
          marginTop: "-120px",
          marginLeft: "-300px",
          marginRight: "120px",
        }}
      >
        {" "}
        {/* 右侧组件 */}
        <OrderHistory />
      </div>
    </div>
  );
}

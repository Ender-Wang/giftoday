import { useEffect } from "react";
import Login from "../components/Login";

export default function LoginPage() {
  useEffect(() => {
    document.title = "Giftoday - Login";
  }, []);
  return <Login />;
}

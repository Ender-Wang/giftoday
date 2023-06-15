import { useEffect } from "react";
import Registration from "../components/Registration";

export default function RegistrationPage() {
  useEffect(() => {
    document.title = "Giftoday - Registration";
  }, []);
  return <Registration />;
}

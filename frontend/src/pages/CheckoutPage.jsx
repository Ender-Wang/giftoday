import { useEffect } from "react";
import Checkout from "../components/Checkout";

export default function CheckoutPage() {
  useEffect(() => {
    document.title = "Giftoday - Checkout";
  }, []);

  return (
    <div>
      <Checkout />
    </div>
  );
}

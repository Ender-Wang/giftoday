import { useEffect } from "react";
import PremiumBenefits from "../components/PremiumBenefits";
import PaymentDetail from "../components/PaymentDetail";

export default function PremiumBenefitsPage() {
  useEffect(() => {
    document.title = "Giftoday - Premium Benefits";
  }, []);
  return (
    <div className="flex items-start justify-between">
      <PremiumBenefits />
      <PaymentDetail />
    </div>
  );
}

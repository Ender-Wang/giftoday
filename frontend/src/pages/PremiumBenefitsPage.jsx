import { useEffect } from "react";
import PremiumBenefits from "../components/PremiumBenefits";

export default function PremiumBenefitsPage() {
  useEffect(() => {
    document.title = "Giftoday - Premium Benefits";
  }, []);
  return <PremiumBenefits />;
}

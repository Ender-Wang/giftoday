import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OrderConfirmationPage = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    } else {
      navigate("/giftoday.com");
    }
  }, [countdown, navigate]);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">
        🥳Congratulations! 🎉Your order submitted successfully!🎉
      </h1>
      <h2 className="mt-4 text-2xl">Redirecting in {countdown}...</h2>
    </div>
  );
};

export default OrderConfirmationPage;

import React from "react";
import { useSelector } from "react-redux";
import "./Plan.css";

function Plan({ plan, onClick }) {
  const payment = useSelector((state) => state.payment);
  return (
    <div className="plan">
      <div className="plan_left">
        <h3>{plan.name}</h3>
        <h5>{`${plan.resolution + " "} (₹ ${" " + plan.amount})`}</h5>
      </div>
      <button
        onClick={() => onClick(plan.id)}
        className={`plan_right ${
         payment && plan.id === payment.planid && "deactivated_plan"
        }`}
        disabled={payment}
      >
        {payment && plan.id === payment.planid ? "Bought" : "Buy"}
      </button>
    </div>
  );
}

export default Plan;

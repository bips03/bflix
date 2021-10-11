import React from "react";
import { useSelector } from "react-redux";
import "./Plan.css";

function Plan({ plan, onClick }) {
  const payment = useSelector((state) => state.payment);
  const check = Object.keys(payment? payment : {}).length>2 && plan.id === payment.planid
  return (
    <div className="plan">
      <div className="plan_left">
        <h3>{plan.name}</h3>
        <h5>{`${plan.resolution + " "} (₹ ${" " + plan.amount})`}</h5>
      </div>
      <button
        onClick={() => onClick(plan.id)}
        className={`plan_right ${
         check && "deactivated_plan"
        }`}
        disabled={check}
      >
        { check? "Bought" : "Buy"}
      </button>
    </div>
  );
}

export default Plan;

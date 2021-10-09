import React, { useEffect } from "react";
import {  useSelector } from "react-redux";
import "./Plans.css";
import Plan from "../Plan/Plan";

function Plans({ setError }) {
  const plans = [
    { id: 1, name: "Basic", amount: "299", resolution: "480p" },
    { id: 2, name: "Standard", amount: "499", resolution: "720p" },
    { id: 3, name: "Advanced", amount: "799", resolution: "1080p" },
  ];

  const user = useSelector((state) => state.user);

  useEffect(() => console.log('loaded'),[])

  const loadRazor = (scriptUrl) => {
    return new Promise((res, rej) => {
      // wait for the script to load if it does send true as response or error as reject which
      // will be caught by async function
      const script = document.createElement("script");
      script.src = scriptUrl;
      script.onload = () => res(true);
      script.onerror = () =>
        rej(new Error("Dialog couldn't load. Try Again later"));
      document.body.appendChild(script);
    });
  };

  const acceptPayment = async (id) => {
    setError(false);
    try {
      await loadRazor("https://checkout.razorpay.com/v1/checkout.js");

      // making the payment via backend
      const response = await fetch("http://localhost:5000/razorpay", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ id, uid: user.uid }),
      });
      const data = await response.json();

      var options = {
        key: "rzp_test_6GB0TI3RDdxRbo",
        currency: data.currency,
        amount: data.amount,
        name: "Bflix",
        description: data.description,
        image:
          "https://www.freepnglogos.com/uploads/netflix-logo-text-emblem-31.png",
        order_id: data.id,
        handler: function (response) {
          window.location.reload()
        },
        prefill: {
          email: user.email,
        },
        theme: {
          color: "#3399cc",
        },
      };
      var paymentObject = new window.Razorpay(options);
      // paymentObject.on("payment-failure", (response) => {
      //   history.push("/failure");
      // });
      paymentObject.open();
    } catch (error) {
      setError(error.message);
      return;
    }
  };

  return (
    <div className="plans">
      <h4>
        <span className="plans_span"> Plans </span>
      </h4>
      {plans.map((p) => {
        return <Plan key={p.id} onClick={acceptPayment} plan={p} />;
      })}
    </div>
  );
}

export default Plans;

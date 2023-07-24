import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import "./Subscription.css";
import { getSubscription, getpaymentorder } from "../../actions/payment";

const Subscritpion = () => {
  const [plan, setPlan] = useState("");
  let [amount, setAmount] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.currentUserReducer);
  const handleOpenRazorpay = (data) => {
    const options = {
      key: "rzp_test_sgdK1uHHwrzcFi",
      amount: Number(data.amount) * 100,
      currency: data.currency,
      order_id: data.id,
      name: plan + " PLAN SUBSCRIPTION ",
      description: "Get stackoverflow subscription",
      handler: (response) => {
        axios
          .post("http://localhost:5000/user/verify", { response: response })
          .then((res) => {
            if (res.data.success === "true") {
              dispatch(getSubscription({ userId: user?.result?._id, plan }));
              navigate("/");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (amount === 0) {
        navigate("/");
      } else {
        const { data } = await axios.post(
          "http://localhost:5000/user/subscription",
          { amount }
        );
        console.log(data);
        handleOpenRazorpay(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="home-container-1 ">
        <LeftSidebar />
        <div className="Sub-container-2">
          <form className="Sub-plan-1" onSubmit={handleSubmit}>
            <div className="header-container">
              <h1 className="Free-plan">Free Plan</h1>
              <h3>Free Of Cost</h3>
              <div className="button-container">
                <button
                  type="submit"
                  className="pay-btn"
                  onClick={() => {
                    setPlan("FREE");
                    setAmount(0);
                  }}
                >
                  Activate
                </button>
              </div>
            </div>
            <p>You can ask 1 questions per day</p>
          </form>
          <form className="Sub-plan-1" onSubmit={handleSubmit}>
            <div className="header-container">
              <h1 className="silver-plan">Silver Plan</h1>
              <h3>Rs.100/month</h3>
              <div className="button-container">
                <button
                  type="submit"
                  className="pay-btn"
                  value={amount}
                  onClick={(e) => {
                    setPlan("SILVER");
                    setAmount(100);
                  }}
                >
                  Activate
                </button>
              </div>
            </div>
            <p>You can ask only 5 questions per day</p>
          </form>
          <form className="Sub-plan-1" onSubmit={handleSubmit}>
            <div className="header-container">
              <h1 className="Gold-plan">Gold Plan</h1>
              <h3>Rs.1000/month</h3>
              <div className="button-container">
                <button
                  type="submit"
                  className="pay-btn"
                  value={amount}
                  onClick={(e) => {
                    setPlan("GOLD");
                    setAmount(1000);
                  }}
                >
                  Activate
                </button>
              </div>
            </div>
            <p>You can ask unlimited questions per day</p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Subscritpion;

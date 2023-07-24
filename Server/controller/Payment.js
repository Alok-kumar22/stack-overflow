import Razorpay from "razorpay";
import dotenv from "dotenv";
import { instance } from "../index.js";
import crypto from "crypto";
import SubscriptionModel from "../models/Subscription.js";
export const paymentController = async (req, res) => {
  try {
    const { amount } = req.body;
    console.log(amount);
    var options = {
      amount: amount * 100,
      currency: "INR",
    };

    instance.orders.create(options, (err, order) => {
      if (err) {
        console.log(err);
        return res.status(404).send({ code: 500, err });
      }
      res.status(200).send({ success: true, data: order });
    });
  } catch (error) {
    console.log(error);
  }
};

export const verifyPayment = async (req, res) => {
  try {
    let body =
      req.body.response.razorpay_order_id +
      "|" +
      req.body.response.razorpay_payment_id;

    var expectedSignature = crypto
      .createHmac("sha256", "X9tCCmCavSYEQ1GhYKFvn75K")
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === req.body.response.razorpay_signature) {
      res.status(200).send({ success: "true", message: "Payment Done" });
    } else {
      res.status(400).send({ success: "false", message: "Payment Failed!" });
    }
  } catch (error) {
    console.log(error);
    res.status(404).send({ success: "false", message: error.message });
  }
};

export const getSubscriptionPlan = async (req, res) => {
  const { userId, plan } = req.body;
  var subdate = new Date();
  var expdate = new Date();
  let month = subdate.getMonth() + 1;
  expdate.setMonth(month);
  subdate.setHours(1, 1, 1, 1);
  expdate.setHours(1, 1, 1, 1);

  try {
    const alreadyplan = await SubscriptionModel.find({
      $and: [{ userId: userId }, { expDate: { $gt: subdate } }],
    });
    if (alreadyplan.length !== 0) {
      return res.status(200).json({ data: "Current plan is not expired " });
    }
    const subdatas = new SubscriptionModel({
      userId: userId,
      plan: plan,
      subDate: subdate,
      expDate: expdate,
    }).save();

    const { data } = await SubscriptionModel.find({
      $and: [{ userId: userId }, { expDate: { $gt: subdate } }],
    });
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    res.status(404).send({ success: "false", message: error.message });
  }
};

export const deleteexpSubscription = async (req, res) => {
  const { id: _id } = req.params;

  var date = new Date();
  date.setHours(1, 1, 1, 1);
  try {
    await SubscriptionModel.deleteOne({
      $and: [{ userId: _id }, { expDate: { $lte: date } }],
    });
    const data = await SubscriptionModel.find({ userId: _id });
    res.status(200).send({ success: "true", data });
  } catch (error) {
    res.status(400).send({ success: "false", message: error.message });
  }
};

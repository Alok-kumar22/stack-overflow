import express from "express";
import {
  deletefollowings,
  followings,
  login,
  signup,
} from "../controller/auth.js";
import { getAllUsers, updateProfile } from "../controller/users.js";
import {
  deleteexpSubscription,
  getSubscriptionPlan,
  paymentController,
  verifyPayment,
} from "../controller/Payment.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/getAllUsers", getAllUsers);
router.put("/following/:id", followings);
router.put("/removefollower/:id", deletefollowings);
router.patch("/update/:id", updateProfile);
router.post("/subscription", paymentController);
router.post("/verify", verifyPayment);
router.post("/getplan", getSubscriptionPlan);
router.delete("/deleteplan/:id", deleteexpSubscription);
export default router;

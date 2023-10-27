import mongoose from "mongoose";
import { User } from "./userModel";

const { Schema, model, models } = mongoose;

const orderModel = new Schema({
  orderList: { type: OrderList, required: true },
  user: {
    type: User,
    required: true,
  },
  payment: { type: Boolean, required: true },
});

const OrderList = {
  cart: [],
  totalProduct: 0,
  totalPrice: 0,
};
const addressModel = {
  countery: "",
  city: "",
  street: "",
  zipCode: "",
};

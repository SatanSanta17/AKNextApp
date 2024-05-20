import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { MenuItem } from "@/models/MenuItem";
// import { Order } from "@/models/Order";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import Razorpay from "razorpay";
import { NextResponse } from "next/server";
import shortid from "shortid"

export async function POST(req) {
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_TEST_KEY_ID,
    key_secret: process.env.RAZORPAY_TEST_SECRET,
  });

  mongoose.connect(process.env.MONGO_URL);

  const { cartProducts, address } = await req.json();
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  // const orderDoc = await Order.create({
  //   userEmail,
  //   ...address,
  //   cartProducts,
  //   paid: false,
  // });

  let totalPrice = 0;
  for (const cartProduct of cartProducts) {
    const productInfo = await MenuItem.findById(cartProduct._id);

    let productPrice = productInfo.basePrice;
    if (cartProduct.size) {
      const size = productInfo.sizes.find(
        (size) => size._id.toString() === cartProduct.size._id.toString()
      );
      productPrice += size.price;
    }
    if (cartProduct.extras?.length > 0) {
      for (const cartProductExtraThing of cartProduct.extras) {
        const productExtras = productInfo.extraIngredientPrices;
        const extraThingInfo = productExtras.find(
          (extra) =>
            extra._id.toString() === cartProductExtraThing._id.toString()
        );
        productPrice += extraThingInfo.price;
      }
    }
    totalPrice += productPrice;
  }

  const options = {
    amount: totalPrice * 100, // Amount in paise
    currency: "INR",
    receipt: shortid.generate(),
  };

  // razorpay.orders.create(options, function (err, order) {
  //   if (err) {
  //     console.error(err);
  //     return res.status(500).json({ error: "Razorpay order creation failed" });
  //   }
  //   // Redirect the user to the Razorpay checkout page
  //   res.status(200).json(order);
  // });

  const order = await razorpay.orders.create(options);
  console.log(order);
  return NextResponse.json({ orderId: order.id , amount:order.amount}, { status: 200 });
}

"use client";
import { CartContext, cartProductPrice } from "@/components/AppContext";
import Trash from "@/components/icons/Trash";
import AddressInputs from "@/components/layout/AddressInputs";
import SectionHeaders from "@/components/layout/SectionHeaders";
import CartProduct from "@/components/menu/CartProduct";
import { useProfile } from "@/components/UseProfile";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Script from "next/script";
import { Order } from "@/models/Order";

export default function CartPage() {
  const { cartProducts, removeCartProduct } = useContext(CartContext);
  const [address, setAddress] = useState({});
  const { data: profileData } = useProfile();
  var orderId;
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.href.includes("canceled=1")) {
        toast.error("Payment failed 😔");
      }
    }
  }, []);

  useEffect(() => {
    if (profileData?.city) {
      const { phone, streetAddress, city, postalCode, country } = profileData;
      const addressFromProfile = {
        phone,
        streetAddress,
        city,
        postalCode,
        country,
      };
      setAddress(addressFromProfile);
    }
  }, [profileData]);

  let subtotal = 0;
  for (const p of cartProducts) {
    subtotal += cartProductPrice(p);
  }
  function handleAddressChange(propName, value) {
    setAddress((prevAddress) => ({ ...prevAddress, [propName]: value }));
  }
  async function proceedToCheckout(ev) {
    ev.preventDefault();
    // address and shopping cart products
    try {
      const data = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address,
          cartProducts,
        }),
      }).then((t) => t.json());

      console.log(data); // Log the response from the API
      // const { order } = data;
      const order = data;
      const options = {
        key: process.env.RAZORPAY_TEST_KEY_ID, // Your Razorpay API key
        order_id: order.orderId,
        amount: order.amount,
        currency: "INR",
        name: "Your Company Name",
        description: "Your Payment Description",
        image: "https://example.com/your_logo.png",
        handler: function (response) {
          // Handle the Razorpay response after successful payment
          alert("Payment successful!");
          // You can redirect the user to a success page or perform other actions here
          const orderDoc = Order.create({
            userEmail,
            ...address,
            cartProducts,
            paid: true,
          });
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "1234567890",
        },
        theme: {
          color: "#3399cc",
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      paymentObject.on("payment.failed", function (response) {
        alert("Payment failed. Please try again. Contact support for help");
      });

      // Handle the response data here
    } catch (error) {
      console.error("Error fetching/processing data from API:", error);
      // Handle the error here
    }
  }
  if (cartProducts?.length === 0) {
    return (
      <section className="mt-8 text-center">
        <SectionHeaders mainHeader="Cart" />
        <p className="mt-4">Your shopping cart is empty 😔</p>
      </section>
    );
  }

  return (
    <>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <section className="mt-8">
        <div className="text-center">
          <SectionHeaders mainHeader="Cart" />
        </div>
        <div className="mt-8 grid gap-8 grid-cols-2">
          <div>
            {cartProducts?.length === 0 && (
              <div>No products in your shopping cart</div>
            )}
            {cartProducts?.length > 0 &&
              cartProducts.map((product, index) => (
                <CartProduct
                  key={index}
                  product={product}
                  onRemove={removeCartProduct}
                  index={index}
                />
              ))}
            <div className="py-2 pr-16 flex justify-end items-center">
              <div className="text-gray-500">
                Subtotal:
                <br />
                Delivery:
                <br />
                Total:
              </div>
              <div className="font-semibold pl-2 text-right">
                ${subtotal}
                <br />
                $5
                <br />${subtotal + 5}
              </div>
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2>Checkout</h2>
            <form onSubmit={proceedToCheckout}>
              <AddressInputs
                addressProps={address}
                setAddressProp={handleAddressChange}
              />
              <button type="submit">Pay ${subtotal + 5}</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

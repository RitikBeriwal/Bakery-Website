import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseQty,
  decreaseQty,
  deleteItem,
  clearCart,
  selectCart,
} from "../redux/Slice";
import { toast } from "react-hot-toast";

const Cart = () => {
  const dispatch = useDispatch();
  const { items, taxRate, delivery } = useSelector(selectCart);

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const tax = subtotal * taxRate;
  const grandTotal = subtotal + tax + delivery;

  // ✅ Razorpay with backend integration + React Hot Toast
  const handlePayment = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/payment/create-order",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: grandTotal }),
        }
      );

      const data = await res.json();

      if (!data.success) return toast.error("Order creation failed");

      const options = {
        key: "rzp_test_Rn3xa74qiaEekq", // your Razorpay test key
        amount: data.amount,
        currency: data.currency,
        order_id: data.order_id,
        name: "My Bakery Store",
        description: "Order Payment",
        handler: function (response) {
          toast.success("Payment Successful!");
          dispatch(clearCart());
        },
        theme: { color: "#c43b52" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      toast.error("Payment failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 p-6 lg:p-10 bg-gray-50 min-h-screen mt-24">
      {/* LEFT SIDE - ITEMS */}
      <div className="flex-1 w-full lg:w-2/3">
        {items.length === 0 && (
          <p className="text-center text-gray-500 mt-10">Your cart is empty</p>
        )}
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row items-center sm:items-start bg-white p-4 rounded-xl shadow-md mb-4"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 sm:w-20 sm:h-20 rounded-lg mr-0 sm:mr-5 mb-2 sm:mb-0 object-cover"
            />

            <div className="flex-1 text-center sm:text-left mb-2 sm:mb-0">
              <h4 className="text-lg font-medium">{item.name}</h4>
              <p className="text-gray-700">₹{item.price}</p>
            </div>

            {/* Qty buttons */}
            <div className="flex items-center gap-3 mb-2 sm:mb-0">
              <button
                className="px-3 py-1 bg-gray-200 rounded-md"
                onClick={() => dispatch(decreaseQty(item.id))}
              >
                -
              </button>
              <span className="text-lg font-medium">{item.qty}</span>
              <button
                className="px-3 py-1 bg-gray-200 rounded-md"
                onClick={() => dispatch(increaseQty(item.id))}
              >
                +
              </button>
            </div>

            <button
              className="text-red-600 hover:text-red-800 text-xl mt-2 sm:mt-0"
              onClick={() => dispatch(deleteItem(item.id))}
            >
              🗑
            </button>
          </div>
        ))}

        {items.length > 0 && (
          <button
            onClick={() => {
              dispatch(clearCart());
              toast.success("Cart cleared successfully");
            }}
            className="mt-5 px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 w-full sm:w-auto"
          >
            Clear Cart
          </button>
        )}
      </div>

      {/* SUMMARY */}
      <div className="w-full lg:w-1/3 bg-white p-6 rounded-xl shadow-md h-fit">
        <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

        <div className="space-y-2 text-gray-700">
          <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
          <p>Tax (10%): ₹{tax.toFixed(2)}</p>
          <p>Delivery: ₹{delivery}</p>
        </div>

        <hr className="my-4" />

        <h2 className="text-2xl font-bold mb-4">
          Grand Total: ₹{grandTotal.toFixed(2)}
        </h2>

        <button
          onClick={handlePayment}
          className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-lg"
        >
          Go to Payment
        </button>
      </div>
    </div>
  );
};

export default Cart;

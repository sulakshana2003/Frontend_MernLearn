/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Checkout() {
  const location = useLocation();
  console.log(location.state);
  const [cart, setCart] = useState(location.state.cart);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  function getTotal() {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      total += cart[i].price * cart[i].qty;
    }
    console.log("Total:", total);
    return total;
  }

  function removeFromCart(productId) {
    const newCart = cart.filter((item) => item.productId !== productId);
    setCart(newCart);
  }

  function changeQty(index, qty) {
    const newCart = [...cart];
    newCart[index].qty += qty;
    if (newCart[index].qty <= 0) {
      newCart.splice(index, 1);
    }
    setCart(newCart);
  }

  async function placeOrder() {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to place order");
      return;
    }
    const oderInformation = {
      products: [],
      phone: phone,
      address: address,
    };
    for (let i = 0; i < cart.length; i++) {
      oderInformation.products.push({
        productId: cart[i].productId,
        quantity: cart[i].qty,
      });
    }
    const response = await axios
      .post(
        import.meta.env.VITE_BACKEND_URI + "/api/orders/",
        oderInformation,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        toast.success("Order placed successfully");
      })
      .catch((error) => {
        console.error("There was an error placing the order!", error);
        console.log(error.response.data);
        toast.error("Error placing order");
      });
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-pink-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
              Checkout
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Review your order before placing it.
            </p>
          </div>

          <div className="inline-flex items-center gap-2">
            <span className="rounded-full border border-rose-200 bg-white px-3 py-1 text-xs font-semibold text-rose-700">
              {cart.length} item(s)
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Items */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 p-4 sm:p-6">
                <h2 className="text-sm font-semibold text-slate-900">
                  Order Items
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Adjust quantities if needed.
                </p>
              </div>

              <div className="divide-y divide-slate-100">
                {cart.map((item) => {
                  return (
                    <div
                      key={item.productId}
                      className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6"
                    >
                      {/* Product */}
                      <div className="flex items-center gap-4">
                        <div className="h-20 w-20 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-rose-700">
                            ID: {item.productId}
                          </p>
                          <p className="mt-1 line-clamp-1 text-base font-semibold text-slate-900">
                            {item.name}
                          </p>

                          <div className="mt-2 flex flex-wrap items-center gap-2">
                            {item.labledprice ? (
                              <span className="text-xs text-slate-500 line-through">
                                {item.labledprice}
                              </span>
                            ) : null}
                            <span className="text-sm font-semibold text-slate-900">
                              {item.price}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Qty + Total + Inputs + Remove */}
                      <div className="flex flex-col gap-3 sm:items-end">
                        {/* Quantity */}
                        <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">
                          <button
                            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 transition hover:bg-slate-50 active:scale-[0.98]"
                            onClick={() => changeQty(cart.indexOf(item), -1)}
                          >
                            −
                          </button>

                          <h1 className="min-w-[44px] text-center text-sm font-semibold text-slate-900">
                            {item.qty}
                          </h1>

                          <button
                            className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 active:scale-[0.98]"
                            onClick={() => changeQty(cart.indexOf(item), 1)}
                          >
                            +
                          </button>
                        </div>

                        {/* Item total */}
                        <div className="text-sm text-slate-600">
                          Item total:{" "}
                          <span className="font-semibold text-slate-900">
                            {(item.price * item.qty).toFixed(2)}
                          </span>
                        </div>

                        {/* NEW: Phone + Address inputs (styled) */}

                        {/* Remove */}
                        <button
                          className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-rose-700 shadow-sm transition hover:bg-rose-50 active:scale-[0.99]"
                          onClick={() => {
                            removeFromCart(item.productId);
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  );
                })}

                {cart.length === 0 && (
                  <div className="p-10 text-center">
                    <p className="text-base font-semibold text-slate-900">
                      No items in checkout
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      Go back and add products to continue.
                    </p>
                    <Link
                      to="/products"
                      className="mt-5 inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
                    >
                      Browse products
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-sm font-semibold text-slate-900">Summary</h2>

              <div className="mt-4 rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Total</span>
                  <span className="font-semibold text-slate-900">
                    {getTotal()}
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  Final total shown here (delivery/taxes if any not included).
                </p>
              </div>

              <div className="w-full sm:w-[320px] mt-6">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold text-slate-700">
                    Delivery details
                  </p>

                  <div className="mt-3 flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-medium text-slate-600">
                        Phone number
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 07X XXX XXXX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-medium text-slate-600">
                        Address
                      </label>
                      <input
                        type="text"
                        placeholder="House no, street, city"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Link
                to="/checkout"
                className={`mt-5 inline-flex w-full items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-sm transition active:scale-[0.99] ${
                  cart.length > 0
                    ? "bg-slate-900 hover:bg-slate-800"
                    : "pointer-events-none bg-slate-300"
                }`}
                onClick={() => placeOrder()}
              >
                Place Order
              </Link>

              <Link
                to="/cart"
                className="mt-3 inline-flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                Back to Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

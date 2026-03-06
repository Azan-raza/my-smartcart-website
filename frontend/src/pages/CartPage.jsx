import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { currency } from "../utils/format";
import api from "../utils/api";
import { getDefaultProductImageUrl } from "../utils/productImage";

const shippingFields = [
  { key: "fullName", label: "Full Name" },
  { key: "phone", label: "Phone Number" },
  { key: "address", label: "Street Address" },
  { key: "city", label: "City" },
  { key: "postalCode", label: "Postal Code" },
  { key: "country", label: "Country" }
];

const CartPage = () => {
  const { user } = useAuth();
  const { items, total, updateQuantity, removeItem, clearCart } = useCart();
  const navigate = useNavigate();
  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: ""
  });
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Stripe");

  const checkout = async () => {
    if (!user) return toast.error("Please login to continue");
    if (!items.length) return toast.error("Your cart is empty");

    const missing = Object.values(shippingAddress).some((value) => !value.trim());
    if (missing) return toast.error("Complete shipping details");

    setLoading(true);
    try {
      if (paymentMethod === "CashOnDelivery") {
        await api.post("/orders/cod", { items, shippingAddress });
        clearCart();
        toast.success("Order placed with Cash on Delivery");
        navigate("/orders");
      } else {
        const { data } = await api.post("/orders/checkout-session", { items, shippingAddress });
        window.location.href = data.url;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Checkout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
      <section className="cart-shell card overflow-hidden">
        <div className="cart-header-panel rounded-2xl p-4 sm:p-5">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Your Cart</h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            {items.length} item{items.length === 1 ? "" : "s"} ready for checkout
          </p>
        </div>

        {!items.length ? (
          <div className="mt-5 rounded-xl border border-dashed border-slate-300 p-6 text-center dark:border-slate-700">
            <p className="text-slate-500">No items in cart.</p>
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {items.map((item) => (
              <article
                key={item.key}
                className="group relative flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:flex-row dark:border-slate-700 dark:bg-slate-900"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  onError={(e) => {
                    e.currentTarget.src = getDefaultProductImageUrl();
                  }}
                  className="h-24 w-24 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-slate-500">{item.size} / {item.color}</p>
                  <p className="mt-1 text-sm font-semibold">{currency(item.price)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.key, Math.max(1, item.quantity - 1))}
                    className="rounded-lg border border-slate-300 px-2 py-1 text-sm dark:border-slate-600"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.key, Math.max(1, Number(e.target.value) || 1))}
                    className="h-10 w-16 rounded-lg border border-slate-300 px-2 text-center dark:border-slate-600 dark:bg-slate-800"
                  />
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.key, item.quantity + 1)}
                    className="rounded-lg border border-slate-300 px-2 py-1 text-sm dark:border-slate-600"
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(item.key)}
                  className="text-sm font-medium text-rose-500 hover:text-rose-600"
                >
                  Remove
                </button>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="card bg-gradient-to-br from-white to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <h2 className="text-xl font-bold">Shipping & Checkout</h2>
        <div className="mt-3 grid gap-2">
          {shippingFields.map((field) => (
            <label key={field.key} className="space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
                {field.label}
              </span>
              <input
                type="text"
                value={shippingAddress[field.key]}
                onChange={(e) =>
                  setShippingAddress((prev) => ({ ...prev, [field.key]: e.target.value }))
                }
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900"
              />
            </label>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4 dark:border-slate-700">
          <span className="text-slate-500">Total</span>
          <span className="text-xl font-bold">{currency(total)}</span>
        </div>
        <div className="mt-4 space-y-2">
          <p className="text-sm font-semibold">Payment Method</p>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="paymentMethod"
              value="Stripe"
              checked={paymentMethod === "Stripe"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Stripe (Card)
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="paymentMethod"
              value="CashOnDelivery"
              checked={paymentMethod === "CashOnDelivery"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Cash on Delivery
          </label>
        </div>
        <button type="button" onClick={checkout} className="btn-primary mt-4 w-full" disabled={loading}>
          {loading
            ? "Processing..."
            : paymentMethod === "CashOnDelivery"
              ? "Place COD Order"
              : "Proceed to Stripe Checkout"}
        </button>
        <p className="mt-2 text-center text-xs text-slate-500 dark:text-slate-300">
          {paymentMethod === "CashOnDelivery"
            ? "Pay cash when your order is delivered."
            : "Secure payments powered by Stripe."}
        </p>
      </section>
    </div>
  );
};

export default CartPage;

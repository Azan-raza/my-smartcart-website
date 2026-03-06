import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Loader from "../components/common/Loader";
import { useCart } from "../context/CartContext";
import { currency } from "../utils/format";
import api from "../utils/api";

const CheckoutSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { clearCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const load = async () => {
      if (!sessionId) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const { data } = await api.get(`/orders/confirm?sessionId=${sessionId}`);
        setOrder(data.order);
        clearCart();
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [sessionId, clearCart]);

  if (loading) return <Loader text="Confirming payment..." />;
  if (!order) return <p>Order not found.</p>;

  return (
    <section className="card mx-auto max-w-2xl text-center">
      <h1 className="text-3xl font-bold">Payment Successful</h1>
      <p className="mt-2 text-slate-500">Your order has been confirmed and is now processing.</p>
      <div className="mt-6 rounded-xl border border-slate-200 p-4 text-left">
        <p><strong>Order ID:</strong> {order._id}</p>
        <p><strong>Payment Method:</strong> {order.paymentMethod || "Stripe"}</p>
        <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
        <p><strong>Order Status:</strong> {order.orderStatus}</p>
        <p><strong>Total:</strong> {currency(order.totalAmount)}</p>
      </div>
      <div className="mt-4 flex justify-center gap-3">
        <Link to="/orders" className="btn-primary">View Orders</Link>
        <Link to="/products" className="rounded-xl border border-slate-300 px-4 py-2">Continue Shopping</Link>
      </div>
    </section>
  );
};

export default CheckoutSuccessPage;

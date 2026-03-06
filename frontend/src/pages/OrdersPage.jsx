import { useEffect, useState } from "react";
import Loader from "../components/common/Loader";
import { currency, formatDate } from "../utils/format";
import api from "../utils/api";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const { data } = await api.get("/orders/my-orders");
        setOrders(data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <Loader text="Loading orders..." />;

  return (
    <section className="card">
      <h1 className="text-2xl font-bold">My Orders</h1>
      <div className="mt-4 space-y-3">
        {orders.length ? (
          orders.map((order) => (
            <article key={order._id} className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                <p><strong>Date:</strong> {formatDate(order.createdAt)}</p>
                <p><strong>Total:</strong> {currency(order.totalAmount)}</p>
                <p><strong>Payment:</strong> {(order.paymentMethod || "Stripe")} / {order.paymentStatus}</p>
                <p><strong>Status:</strong> {order.orderStatus}</p>
              </div>
            </article>
          ))
        ) : (
          <p className="text-slate-500">No orders found.</p>
        )}
      </div>
    </section>
  );
};

export default OrdersPage;

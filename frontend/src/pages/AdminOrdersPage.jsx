import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../utils/api";
import { currency, formatDate } from "../utils/format";

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    const { data } = await api.get("/admin/orders");
    setOrders(data);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const updateStatus = async (id, body) => {
    try {
      await api.patch(`/admin/orders/${id}/status`, body);
      toast.success("Order updated");
      await loadOrders();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update order");
    }
  };

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Manage Orders</h1>
      {orders.map((order) => (
        <article key={order._id} className="card space-y-3">
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            <p><strong>Customer:</strong> {order.user?.name || "N/A"}</p>
            <p><strong>Date:</strong> {formatDate(order.createdAt)}</p>
            <p><strong>Total:</strong> {currency(order.totalAmount)}</p>
            <p><strong>Payment:</strong> {order.paymentMethod || "Stripe"} / {order.paymentStatus}</p>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            <select value={order.orderStatus} onChange={(e) => updateStatus(order._id, { orderStatus: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2">
              {["Processing", "Shipped", "Delivered"].map((status) => <option key={status}>{status}</option>)}
            </select>
            <select value={order.paymentStatus} onChange={(e) => updateStatus(order._id, { paymentStatus: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2">
              {["Pending", "Paid", "Failed"].map((status) => <option key={status}>{status}</option>)}
            </select>
          </div>
        </article>
      ))}
    </section>
  );
};

export default AdminOrdersPage;

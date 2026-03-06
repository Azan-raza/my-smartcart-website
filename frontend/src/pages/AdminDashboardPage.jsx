import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../utils/api";

const AdminDashboardPage = () => {
  const [stats, setStats] = useState({ productsCount: 0, usersCount: 0, ordersCount: 0 });

  useEffect(() => {
    const load = async () => {
      const { data } = await api.get("/admin/stats");
      setStats(data);
    };
    load();
  }, []);

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="card"><p className="text-sm text-slate-500">Products</p><p className="text-3xl font-bold">{stats.productsCount}</p></div>
        <div className="card"><p className="text-sm text-slate-500">Users</p><p className="text-3xl font-bold">{stats.usersCount}</p></div>
        <div className="card"><p className="text-sm text-slate-500">Orders</p><p className="text-3xl font-bold">{stats.ordersCount}</p></div>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <Link to="/admin/products" className="btn-primary text-center">Manage Products</Link>
        <Link to="/admin/users" className="btn-primary text-center">Manage Users</Link>
        <Link to="/admin/orders" className="btn-primary text-center">Manage Orders</Link>
      </div>
    </section>
  );
};

export default AdminDashboardPage;

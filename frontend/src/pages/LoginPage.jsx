import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const adminCredentials = {
  email: "aazan3045@gmail.com",
  password: "korejoazan12"
};

const LoginPage = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || "/";
  const [form, setForm] = useState({ email: "", password: "" });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login(form);
      toast.success("Logged in");
      navigate(redirectTo);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <section className="card mx-auto max-w-md">
      <h1 className="text-2xl font-bold">Login</h1>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
        Admin email: <strong>{adminCredentials.email}</strong>
      </p>
      <form onSubmit={submit} className="mt-4 space-y-3">
        <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))} className="w-full rounded-lg border border-slate-300 px-3 py-2" required />
        <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))} className="w-full rounded-lg border border-slate-300 px-3 py-2" required />
        <button type="submit" className="btn-primary w-full" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
      </form>
      <button
        type="button"
        onClick={() => setForm(adminCredentials)}
        className="mt-3 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
      >
        Use Admin Credentials
      </button>
      <p className="mt-3 text-sm">No account? <Link to="/register" className="text-sky-600">Register</Link></p>
    </section>
  );
};

export default LoginPage;

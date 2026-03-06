import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const RegisterPage = () => {
  const { register, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      toast.success("Account created");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <section className="card mx-auto max-w-md">
      <h1 className="text-2xl font-bold">Register</h1>
      <form onSubmit={submit} className="mt-4 space-y-3">
        <input type="text" placeholder="Name" value={form.name} onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))} className="w-full rounded-lg border border-slate-300 px-3 py-2" required />
        <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))} className="w-full rounded-lg border border-slate-300 px-3 py-2" required />
        <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))} className="w-full rounded-lg border border-slate-300 px-3 py-2" required />
        <button type="submit" className="btn-primary w-full" disabled={loading}>{loading ? "Creating..." : "Register"}</button>
      </form>
      <p className="mt-3 text-sm">Already have an account? <Link to="/login" className="text-sky-600">Login</Link></p>
    </section>
  );
};

export default RegisterPage;

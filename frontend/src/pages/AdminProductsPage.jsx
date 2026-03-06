import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../utils/api";
import { currency } from "../utils/format";

const initialForm = {
  name: "",
  category: "T-Shirts",
  price: 0,
  discountPrice: "",
  description: "",
  colors: "Black,White",
  countInStock: 10,
  isBestSeller: false
};

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);

  const loadProducts = async () => {
    const { data } = await api.get("/admin/products");
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    const payload = {
      name: form.name,
      title: form.name,
      category: form.category,
      price: Number(form.price),
      ...(form.discountPrice ? { discountPrice: Number(form.discountPrice) } : {}),
      description: form.description,
      sizes: ["S", "M", "L", "XL"],
      colors: form.colors.split(",").map((x) => x.trim()).filter(Boolean),
      countInStock: Number(form.countInStock),
      rating: 0,
      numReviews: 0,
      reviews: [],
      isBestSeller: form.isBestSeller
    };

    try {
      if (editingId) {
        await api.put(`/admin/products/${editingId}`, payload);
        toast.success("Product updated");
      } else {
        await api.post("/admin/products", payload);
        toast.success("Product added");
      }
      setForm(initialForm);
      setEditingId(null);
      await loadProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save product");
    }
  };

  const startEdit = (product) => {
    setEditingId(product._id);
    setForm({
      name: product.name,
      category: product.category,
      price: product.price,
      discountPrice: product.discountPrice || "",
      description: product.description,
      colors: product.colors.join(","),
      countInStock: product.countInStock,
      isBestSeller: product.isBestSeller
    });
  };

  const removeProduct = async (id) => {
    try {
      await api.delete(`/admin/products/${id}`);
      toast.success("Product removed");
      await loadProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Manage Products</h1>
      <form onSubmit={submit} className="card grid gap-3 md:grid-cols-2">
        <input type="text" placeholder="Name" value={form.name} onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))} className="rounded-lg border border-slate-300 px-3 py-2" required />
        <select value={form.category} onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))} className="rounded-lg border border-slate-300 px-3 py-2">
          {["T-Shirts", "Hoodies", "Pants", "Shirts", "Jackets"].map((category) => <option key={category}>{category}</option>)}
        </select>
        <input type="number" placeholder="Price" value={form.price} onChange={(e) => setForm((prev) => ({ ...prev, price: e.target.value }))} className="rounded-lg border border-slate-300 px-3 py-2" required />
        <input type="number" placeholder="Discount Price" value={form.discountPrice} onChange={(e) => setForm((prev) => ({ ...prev, discountPrice: e.target.value }))} className="rounded-lg border border-slate-300 px-3 py-2" />
        <p className="rounded-lg border border-dashed border-slate-300 px-3 py-2 text-sm text-slate-500 md:col-span-2">
          Product image is generated automatically from name, category, and description.
        </p>
        <input type="text" placeholder="Colors (comma separated)" value={form.colors} onChange={(e) => setForm((prev) => ({ ...prev, colors: e.target.value }))} className="rounded-lg border border-slate-300 px-3 py-2" required />
        <input type="number" placeholder="Stock" value={form.countInStock} onChange={(e) => setForm((prev) => ({ ...prev, countInStock: e.target.value }))} className="rounded-lg border border-slate-300 px-3 py-2" required />
        <textarea placeholder="Description" value={form.description} onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))} rows={3} className="rounded-lg border border-slate-300 px-3 py-2 md:col-span-2" required />
        <label className="flex items-center gap-2 md:col-span-2"><input type="checkbox" checked={form.isBestSeller} onChange={(e) => setForm((prev) => ({ ...prev, isBestSeller: e.target.checked }))} />Best Seller</label>
        <button type="submit" className="btn-primary md:col-span-2">{editingId ? "Update Product" : "Add Product"}</button>
      </form>
      <div className="space-y-2">
        {products.map((product) => (
          <article key={product._id} className="card flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold">{product.name}</p>
              <p className="text-sm text-slate-500">{product.category} | {currency(product.price)} | Stock: {product.countInStock}</p>
            </div>
            <div className="flex gap-2">
              <button type="button" className="rounded-lg border px-3 py-1" onClick={() => startEdit(product)}>Edit</button>
              <button type="button" className="rounded-lg border px-3 py-1 text-rose-600" onClick={() => removeProduct(product._id)}>Delete</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default AdminProductsPage;

import { Link } from "react-router-dom";

const categories = ["T-Shirts", "Hoodies", "Pants", "Shirts", "Jackets"];
const categoryStyles = {
  "T-Shirts": "from-cyan-500/20 to-sky-500/5",
  Hoodies: "from-indigo-500/20 to-blue-500/5",
  Pants: "from-emerald-500/20 to-green-500/5",
  Shirts: "from-amber-500/20 to-orange-500/5",
  Jackets: "from-rose-500/20 to-pink-500/5"
};

const CategoryQuickLinks = () => {
  return (
    <section>
      <h2 className="mb-4 text-2xl font-black tracking-tight text-slate-900 dark:text-slate-100">Shop by Category</h2>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        {categories.map((category) => (
          <Link
            key={category}
            to={`/products?category=${encodeURIComponent(category)}`}
            className={`rounded-2xl border border-slate-200 bg-gradient-to-br p-4 text-center text-sm font-bold text-slate-900 hover:-translate-y-1 hover:shadow-soft dark:border-slate-700 dark:text-slate-100 ${categoryStyles[category]}`}
          >
            {category}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoryQuickLinks;

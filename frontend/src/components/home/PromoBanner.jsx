import { Link } from "react-router-dom";

const PromoBanner = () => {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-r from-slate-900 via-sky-900 to-cyan-700 p-8 text-white shadow-soft dark:border-slate-700">
      <div className="pointer-events-none absolute -right-10 -top-14 h-56 w-56 rounded-full bg-white/15 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-16 left-10 h-52 w-52 rounded-full bg-cyan-300/20 blur-2xl" />
      <p className="relative text-sm uppercase tracking-[0.2em] text-cyan-200">Limited Offer</p>
      <h2 className="relative mt-2 text-3xl font-black tracking-tight md:text-4xl">Up to 35% off best sellers</h2>
      <p className="relative mt-2 max-w-xl text-sm text-cyan-50">
        Refresh your closet with premium essentials and timeless silhouettes.
      </p>
      <Link to="/products?bestSeller=true" className="relative mt-5 inline-block rounded-xl bg-white px-5 py-2 font-semibold text-slate-900">
        Shop Best Sellers
      </Link>
    </section>
  );
};

export default PromoBanner;

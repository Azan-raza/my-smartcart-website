import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-14 border-t border-slate-200/70 bg-white/72 py-10 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/70">
      <div className="container-px grid gap-6 md:grid-cols-3">
        <div>
          <h3 className="text-xl font-black tracking-tight text-slate-900 dark:text-slate-100">Smartcart</h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Modern clothing e-commerce with fast checkout and elegant shopping experience.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-slate-900 dark:text-slate-100">Quick Links</h4>
          <div className="mt-2 flex flex-col gap-1 text-sm">
            <Link to="/products" className="hover:text-teal-600">Shop</Link>
            <Link to="/about" className="hover:text-teal-600">About</Link>
            <Link to="/contact" className="hover:text-teal-600">Contact</Link>
            <Link to="/faq" className="hover:text-teal-600">FAQ</Link>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-slate-900 dark:text-slate-100">Newsletter</h4>
          <div className="mt-3 flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
            />
            <button type="button" className="btn-primary">
              Join
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

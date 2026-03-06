import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Menu, ShoppingBag, UserCircle2, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import MobileMenu from "./MobileMenu";

const navItemClass = ({ isActive }) =>
  `rounded-full px-4 py-2 text-sm font-semibold tracking-wide ${
    isActive
      ? "bg-teal-600 text-white shadow-md"
      : "text-slate-700 hover:bg-white/80 hover:shadow-sm dark:text-slate-200 dark:hover:bg-slate-800"
  }`;

const utilityBtnClass =
  "rounded-xl border border-slate-200 bg-white/80 p-2 text-slate-700 hover:bg-slate-50 hover:shadow-sm dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:bg-slate-800";

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const { items, isCartOpen, toggleCart } = useCart();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const isCartActive =
    isCartOpen || location.pathname === "/cart" || location.pathname.startsWith("/checkout");

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/68 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/65">
      <div className="container-px flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
          <span className="rounded-lg bg-teal-600 px-2 py-1 text-xs font-bold uppercase tracking-[0.18em] text-white">
            SC
          </span>
          <span className="text-xl font-black tracking-tight">Smartcart</span>
        </Link>

        <nav className="hidden items-center gap-2 rounded-full border border-slate-200/70 bg-white/75 px-2 py-2 shadow-sm dark:border-slate-700 dark:bg-slate-900/70 lg:flex">
          <NavLink to="/" className={navItemClass}>
            Home
          </NavLink>
          <NavLink to="/products" className={navItemClass}>
            Shop
          </NavLink>
          <NavLink to="/about" className={navItemClass}>
            About
          </NavLink>
          <NavLink to="/contact" className={navItemClass}>
            Contact
          </NavLink>
          <NavLink to="/faq" className={navItemClass}>
            FAQ
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleCart}
            className={`relative rounded-xl border p-2 shadow-sm ${
              isCartActive
                ? "border-teal-600 bg-teal-600 text-white"
                : "border-slate-200 bg-white/80 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900/70 dark:hover:bg-slate-800"
            }`}
            aria-label="Cart"
          >
            <ShoppingBag size={18} />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 rounded-full bg-rose-500 px-1.5 text-xs text-white">
                {cartCount}
              </span>
            )}
          </button>

          {user ? (
            <div className="hidden items-center gap-2 lg:flex">
              <button
                type="button"
                onClick={() => navigate("/settings")}
                className={utilityBtnClass}
                aria-label="Settings"
              >
                <SlidersHorizontal size={18} />
              </button>
              <button
                type="button"
                onClick={() => navigate("/profile")}
                className={utilityBtnClass}
                aria-label="Profile"
              >
                <UserCircle2 size={18} />
              </button>
              <button type="button" onClick={() => navigate("/orders")} className="btn-primary">
                Orders
              </button>
              {isAdmin && (
                <button type="button" onClick={() => navigate("/admin")} className="btn-primary">
                  Admin
                </button>
              )}
              <button
                type="button"
                onClick={logout}
                className="rounded-xl border border-slate-200 bg-white/80 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Logout
              </button>
            </div>
          ) : (
            <button type="button" onClick={() => navigate("/login")} className="hidden btn-primary lg:block">
              Login
            </button>
          )}

          <button
            type="button"
            className="rounded-xl border border-slate-200 bg-white/80 p-2 lg:hidden dark:border-slate-700 dark:bg-slate-900/70"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Menu"
          >
            <Menu size={18} />
          </button>
        </div>
      </div>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
};

export default Navbar;

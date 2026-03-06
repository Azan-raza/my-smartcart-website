import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

const MobileMenu = ({ open, onClose }) => {
  const { user, logout, isAdmin } = useAuth();
  const { openCart } = useCart();

  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  if (!open) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-40 lg:hidden">
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/55 backdrop-blur-[2px]"
        aria-label="Close mobile menu"
      />
      <aside className="mobile-menu-panel absolute right-0 top-0 h-full w-full max-w-sm overflow-y-auto border-l border-slate-200 bg-white p-4 pt-5 dark:border-slate-700 dark:bg-slate-900">
        <div className="mb-4 flex items-center justify-between border-b border-slate-200 pb-3 dark:border-slate-700">
          <p className="text-lg font-black tracking-tight">Menu</p>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-300 p-2 hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <Link to="/" onClick={onClose} className="mobile-menu-link">
            Home
          </Link>
          <Link
            to="/products"
            onClick={onClose}
            className="mobile-menu-link"
          >
            Shop
          </Link>
          <button
            type="button"
            onClick={() => {
              openCart();
              onClose();
            }}
            className="mobile-menu-link text-left"
          >
            Cart
          </button>
          <Link
            to="/about"
            onClick={onClose}
            className="mobile-menu-link"
          >
            About
          </Link>
          <Link
            to="/contact"
            onClick={onClose}
            className="mobile-menu-link"
          >
            Contact
          </Link>
          <Link
            to="/faq"
            onClick={onClose}
            className="mobile-menu-link"
          >
            FAQ
          </Link>
          {user ? (
            <>
              <Link
                to="/settings"
                onClick={onClose}
                className="mobile-menu-link"
              >
                Settings
              </Link>
              <Link
                to="/profile"
                onClick={onClose}
                className="mobile-menu-link"
              >
                Profile
              </Link>
              <Link
                to="/orders"
                onClick={onClose}
                className="mobile-menu-link"
              >
                Orders
              </Link>
              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={onClose}
                  className="mobile-menu-link"
                >
                  Admin
                </Link>
              )}
              <button
                type="button"
                onClick={() => {
                  logout();
                  onClose();
                }}
                className="mobile-menu-link text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={onClose}
                className="mobile-menu-link"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={onClose}
                className="mobile-menu-link"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </aside>
    </div>,
    document.body
  );
};

export default MobileMenu;

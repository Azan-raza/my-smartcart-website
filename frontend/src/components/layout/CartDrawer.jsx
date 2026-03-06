import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { currency } from "../../utils/format";
import { getDefaultProductImageUrl } from "../../utils/productImage";

const CartDrawer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { items, total, isCartOpen, closeCart, updateQuantity, removeItem } = useCart();

  useEffect(() => {
    if (!isCartOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isCartOpen]);

  useEffect(() => {
    closeCart();
  }, [location.pathname, closeCart]);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-40">
      <button
        type="button"
        className="absolute inset-0 bg-slate-950/50"
        onClick={closeCart}
        aria-label="Close cart drawer"
      />

      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-slate-200 bg-white p-4 shadow-2xl dark:border-slate-700 dark:bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3 dark:border-slate-700">
          <h2 className="text-xl font-bold">Your Cart</h2>
          <button
            type="button"
            onClick={closeCart}
            className="rounded-lg border border-slate-300 p-2 hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-4 flex-1 space-y-3 overflow-y-auto pr-1">
          {!items.length ? (
            <p className="rounded-xl border border-dashed border-slate-300 p-5 text-center text-slate-500 dark:border-slate-700">
              Your cart is empty.
            </p>
          ) : (
            items.map((item) => (
              <article key={item.key} className="rounded-xl border border-slate-200 p-3 dark:border-slate-700">
                <div className="flex gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    onError={(e) => {
                      e.currentTarget.src = getDefaultProductImageUrl();
                    }}
                    className="h-16 w-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-xs text-slate-500">{item.size} / {item.color}</p>
                    <p className="mt-1 text-sm font-semibold">{currency(item.price)}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.key, Math.max(1, item.quantity - 1))}
                      className="rounded-md border border-slate-300 p-1 dark:border-slate-600"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="min-w-6 text-center text-sm font-medium">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.key, item.quantity + 1)}
                      className="rounded-md border border-slate-300 p-1 dark:border-slate-600"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.key)}
                    className="text-sm font-medium text-rose-500 hover:text-rose-600"
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))
          )}
        </div>

        <div className="mt-4 border-t border-slate-200 pt-4 dark:border-slate-700">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-slate-500">Subtotal</span>
            <span className="text-xl font-bold">{currency(total)}</span>
          </div>
          <button
            type="button"
            onClick={() => {
              closeCart();
              navigate("/cart");
            }}
            className="btn-primary w-full"
          >
            View Cart & Checkout
          </button>
        </div>
      </aside>
    </div>
  );
};

export default CartDrawer;

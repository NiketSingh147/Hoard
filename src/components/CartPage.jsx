import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, Trash2, Plus, Minus, X, Sparkles } from "lucide-react";
import { useCart } from "../context/CartContext";
import Breadcrumbs from "./Breadcrumbs";

function CartPage() {
  const navigate = useNavigate();
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getCartSubtotal,
    getCartTotal,
    applyCoupon,
    removeCoupon,
    appliedCoupon,
    discountAmount,
    getItemTotal,
  } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");

  const handleApplyCoupon = () => {
    setCouponError("");
    setCouponSuccess("");

    if (!couponCode.trim()) {
      setCouponError("Please enter a coupon code");
      return;
    }

    const result = applyCoupon(couponCode);
    if (result.success) {
      setCouponSuccess(`OK ${result.message}`);
      setCouponCode("");
      return;
    }

    setCouponError(`Invalid: ${result.message}`);
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    setCouponCode("");
    setCouponError("");
    setCouponSuccess("");
  };

  if (cartItems.length === 0) {
    return (
      <section className="px-4 md:px-8 py-16 bg-[var(--bg)] text-[var(--text)] min-h-[65vh] flex items-center justify-center">
        <div className="max-w-lg w-full text-center rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-8 md:p-10 shadow-[0_16px_40px_rgba(0,0,0,0.14)]">
          <div className="w-24 h-24 rounded-full mx-auto mb-5 flex items-center justify-center bg-[var(--accent)]">
            <ShoppingBag size={42} className="opacity-70" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Your Cart is Empty</h2>
          <p className="text-[var(--muted)] mb-8">
            Pick your favorites and build your cart. Great offers are waiting.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 rounded-lg font-semibold transition duration-300"
            style={{ backgroundColor: "var(--primary)", color: "var(--bg)" }}
          >
            Start Shopping
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 md:px-8 py-16 bg-[var(--bg)] text-[var(--text)]">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Cart" }]} />

      <h2 className="text-3xl md:text-4xl font-bold mb-8">Shopping Cart</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div
              key={`${item.id}-${item.pack}`}
              className="rounded-xl p-4 md:p-5 bg-[var(--bg)] border border-[var(--border)] shadow-[0_8px_20px_rgba(0,0,0,0.08)]"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full sm:w-24 h-48 sm:h-24 object-contain rounded-lg bg-[var(--accent)]"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-base md:text-lg mb-2">{item.title}</h3>
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <p className="text-[var(--muted)]">Unit: Rs {item.price}</p>
                    <p className="text-sm text-[var(--primary)] font-semibold">Pack of {item.pack || 1}</p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3 bg-[var(--accent)] rounded-lg p-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.pack, (item.quantity || 1) - 1)}
                        className="p-1 hover:opacity-70 transition"
                      >
                        <Minus size={18} />
                      </button>
                      <span className="w-8 text-center font-semibold">{item.quantity || 1}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.pack, (item.quantity || 1) + 1)}
                        className="p-1 hover:opacity-70 transition"
                      >
                        <Plus size={18} />
                      </button>
                    </div>

                    <p className="font-bold text-base md:text-lg">Rs {getItemTotal(item)}</p>

                    <button
                      onClick={() => removeFromCart(item.id, item.pack)}
                      className="p-2 hover:bg-red-500/20 rounded-lg transition text-red-500"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 p-6 rounded-xl bg-[var(--bg)] border border-[var(--border)] space-y-6 shadow-[0_10px_24px_rgba(0,0,0,0.08)]">
            <div className="flex items-center gap-2">
              <Sparkles size={18} />
              <h3 className="text-xl font-bold">Order Summary</h3>
            </div>

            <div className="border-b border-[var(--border)] pb-6">
              <label className="text-sm font-semibold mb-3 block">Apply Coupon Code</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(event) => setCouponCode(event.target.value.toUpperCase())}
                  placeholder="Enter code"
                  className="flex-1 px-3 py-2 rounded-lg bg-[var(--accent)] border border-[var(--border)] text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  disabled={Boolean(appliedCoupon)}
                />
                {!appliedCoupon && (
                  <button
                    onClick={handleApplyCoupon}
                    className="px-4 py-2 rounded-lg font-semibold transition duration-300"
                    style={{ backgroundColor: "var(--primary)", color: "var(--bg)" }}
                  >
                    Apply
                  </button>
                )}
              </div>

              {couponError && <p className="text-xs text-red-500 mt-2">{couponError}</p>}
              {couponSuccess && <p className="text-xs text-green-500 mt-2">{couponSuccess}</p>}

              {appliedCoupon && (
                <div className="mt-3 p-3 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center justify-between">
                  <span className="text-sm font-medium text-green-600">OK {appliedCoupon} applied</span>
                  <button
                    onClick={handleRemoveCoupon}
                    className="p-1 hover:bg-red-500/20 rounded transition"
                  >
                    <X size={16} className="text-red-500" />
                  </button>
                </div>
              )}

              {!appliedCoupon && (
                <p className="text-xs text-[var(--muted)] mt-3">Available: SAVE10, SAVE20, SAVE50, SPECIAL</p>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-[var(--muted)]">Subtotal</span>
                <span className="font-semibold">Rs {getCartSubtotal()}</span>
              </div>
              <div className="flex justify-between text-green-500">
                <span className="text-[var(--muted)]">Discount applied</span>
                <span className="font-semibold">- Rs {discountAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--muted)]">Shipping</span>
                <span className="font-semibold text-green-500">Free</span>
              </div>
              <div className="h-px bg-[var(--border)]"></div>
              <div className="flex justify-between text-lg">
                <span className="font-bold">Final Total</span>
                <span className="font-bold" style={{ color: "var(--primary)" }}>
                  Rs {getCartTotal()}
                </span>
              </div>
            </div>

            <button
              className="w-full py-3 rounded-lg font-semibold transition duration-300"
              style={{ backgroundColor: "var(--primary)", color: "var(--bg)" }}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CartPage;

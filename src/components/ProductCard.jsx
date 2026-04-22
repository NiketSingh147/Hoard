import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  X,
  ChevronLeft,
  ChevronRight,
  Star,
  Share2,
  MessageCircle,
  Mail,
  Link2,
  Camera,
  Minus,
  Plus,
  Trash2,
} from "lucide-react";
import { useCart } from "../context/CartContext";

const PACK_OPTIONS = [2, 5, 10, 15, 20];

function ProductCard({
  image,
  title,
  price,
  originalPrice,
  discount,
  images = [],
  rating = 4.3,
  reviewCount = 0,
  id,
  onProductAdded,
}) {
  const navigate = useNavigate();
  const { addToCart, updateQuantity, removeFromCart, getCartItemQuantity } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [showPackSelection, setShowPackSelection] = useState(false);
  const [showShareSheet, setShowShareSheet] = useState(false);
  const [copyMessage, setCopyMessage] = useState("");
  const [selectedPack, setSelectedPack] = useState(PACK_OPTIONS[0]);

  const allImages = images?.length ? images : [image];
  const currentImage = allImages[currentImageIndex] || image;
  const productUrl = useMemo(() => `${window.location.origin}/product/${id}`, [id]);
  const currentQty = getCartItemQuantity(id, selectedPack);

  const productPayload = {
    id,
    image,
    title,
    price,
    originalPrice,
    discount,
    images,
    rating,
    reviewCount,
  };

  const handleAddToCartClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setShowPackSelection(true);
  };

  const handlePackSelect = (pack) => {
    setSelectedPack(pack);
    addToCart(productPayload, pack);
    onProductAdded?.(productPayload, pack);
    setShowPackSelection(false);
  };

  const handleShareClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setShowShareSheet(true);
    setCopyMessage("");
  };

  const openShareLink = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(productUrl);
      setCopyMessage("Link copied");
    } catch {
      setCopyMessage("Copy failed");
    }
  };

  const handlePrevImage = (event) => {
    event.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleNextImage = (event) => {
    event.stopPropagation();
    setCurrentImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  const handleImageClick = () => {
    setModalImageIndex(currentImageIndex);
    setShowImageModal(true);
  };

  const handleModalPrev = () => {
    setModalImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleModalNext = () => {
    setModalImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  const renderStars = (value) => {
    const fullStars = Math.floor(value);
    const hasHalf = value % 1 !== 0;
    const stars = [];

    for (let i = 0; i < 5; i += 1) {
      if (i < fullStars) {
        stars.push(<Star key={i} size={13} className="fill-yellow-400 text-yellow-400" />);
      } else if (i === fullStars && hasHalf) {
        stars.push(
          <div key={i} className="relative">
            <Star size={13} className="text-gray-300" />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <Star size={13} className="fill-yellow-400 text-yellow-400" />
            </div>
          </div>,
        );
      } else {
        stars.push(<Star key={i} size={13} className="text-gray-300" />);
      }
    }

    return stars;
  };

  const formatReviewCount = (count) => {
    if (count >= 100000) return `${(count / 100000).toFixed(1).replace(/\.0$/, "")}L`;
    if (count >= 1000) return `${(count / 1000).toFixed(1).replace(/\.0$/, "")}k`;
    return count.toString();
  };

  return (
    <>
      <div
className="relative rounded-xl overflow-hidden group bg-[var(--surface)] border border-[var(--border)]
md:hover:-translate-y-2 transition duration-300 ease-out h-full flex flex-col"
        style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}
        onMouseEnter={(event) => {
          event.currentTarget.style.backgroundColor = "var(--card-hover-bg)";
          event.currentTarget.style.borderColor = "color-mix(in srgb, var(--primary) 46%, var(--border))";
          event.currentTarget.style.boxShadow = "var(--card-hover-shadow)";
        }}
        onMouseLeave={(event) => {
          event.currentTarget.style.backgroundColor = "var(--surface)";
          event.currentTarget.style.borderColor = "var(--border)";
          event.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.08)";
        }}
      >
        <div
          className="relative w-full aspect-square bg-[var(--accent)] flex items-center justify-center overflow-hidden rounded-t-xl cursor-pointer group/image"
          onClick={handleImageClick}
        >
          <img
            src={currentImage}
            alt={title}
className="w-full h-full object-contain transition duration-500 md:group-hover:scale-105"
          />

          {discount && (
            <span className="absolute top-3 left-3 bg-red-500/90 text-white text-xs font-semibold px-2.5 py-1 rounded-lg shadow-md pointer-events-none">
              {discount}
            </span>
          )}

          <button
            onClick={handleShareClick}
            className="absolute top-3 right-3 p-2.5 rounded-full transition duration-300 shadow-sm opacity-0 group-hover:opacity-100 z-10 border border-[var(--border)] bg-[var(--surface)] hover:scale-105"
          >
            <Share2 size={15} className="text-[var(--text)]" />
          </button>

          {allImages.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/20 backdrop-blur-sm opacity-0 group-hover/image:opacity-100 transition duration-300 hover:bg-white/30 z-10"
              >
                <ChevronLeft size={16} className="text-white" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/20 backdrop-blur-sm opacity-0 group-hover/image:opacity-100 transition duration-300 hover:bg-white/30 z-10"
              >
                <ChevronRight size={16} className="text-white" />
              </button>

              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 opacity-0 group-hover/image:opacity-100 transition duration-300 z-10">
                {allImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(event) => {
                      event.stopPropagation();
                      setCurrentImageIndex(idx);
                    }}
                    className="w-1.5 h-1.5 rounded-full transition duration-300"
                    style={{
                      backgroundColor: idx === currentImageIndex ? "white" : "rgba(255,255,255,0.5)",
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="p-3 md:p-4 flex flex-col gap-2.5 relative z-10 flex-grow">
          <button
            onClick={() => navigate(`/product/${id}`)}
            className="text-left h-[2.8rem] line-clamp-2 text-sm md:text-base font-semibold text-[var(--text)] leading-snug overflow-hidden hover:text-[var(--primary)] transition"
            title={title}
          >
            {title}
          </button>

          <div className="flex items-baseline gap-1.5 flex-wrap min-h-7">
            <span className="text-[var(--text)] font-bold text-base md:text-xl">Rs {price}</span>
            {originalPrice && (
              <span className="text-[var(--muted)] line-through text-sm md:text-base font-medium">
                Rs {originalPrice}
              </span>
            )}
          </div>

          <div className="min-h-6">
            {reviewCount > 0 && (
              <div className="flex items-center gap-1.5 text-sm flex-wrap">
                <span className="font-semibold text-[var(--text)]">{rating}</span>
                <div className="flex gap-0.5">{renderStars(rating)}</div>
                <span className="text-[var(--muted)] text-xs md:text-sm">
                  ({formatReviewCount(reviewCount)})
                </span>
              </div>
            )}
          </div>

          {currentQty > 0 ? (
            <div className="mt-auto space-y-1.5">
              <p className="text-[11px] md:text-xs text-[var(--muted)]">Pack of {selectedPack}</p>
              <div className="w-full rounded-lg border border-[var(--border)] bg-[var(--accent)] p-1.5 flex items-center justify-between">
                <button
                  onClick={() => updateQuantity(id, selectedPack, currentQty - 1)}
                  className="p-1.5 rounded-md hover:bg-black/10 transition"
                >
                  <Minus size={15} />
                </button>
                <span className="font-semibold text-sm min-w-6 text-center">{currentQty}</span>
                <button
                  onClick={() => {
                    addToCart(productPayload, selectedPack);
                    onProductAdded?.(productPayload, selectedPack);
                  }}
                  className="p-1.5 rounded-md hover:bg-black/10 transition"
                >
                  <Plus size={15} />
                </button>
                <button
                  onClick={() => removeFromCart(id, selectedPack)}
                  className="p-1.5 rounded-md hover:bg-red-500/20 text-red-500 transition"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={handleAddToCartClick}
              className="mt-auto flex items-center justify-center gap-2 py-2 md:py-2.5 rounded-lg text-sm md:text-base font-semibold transition duration-300 ease-out active:scale-95 w-full hover:shadow-lg"
              style={{
                backgroundColor: "var(--primary)",
                color: "var(--bg)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            >
              <ShoppingBag size={16} className="md:block hidden" />
              <span>Add to Cart</span>
            </button>
          )}
        </div>

        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none rounded-xl"
          style={{
            background: "linear-gradient(135deg, var(--primary) 0%, transparent 100%)",
            opacity: 0.02,
          }}
        ></div>
      </div>

      {showShareSheet && (
        <div
          className="fixed inset-0 bg-black/45 z-[130] flex md:items-center md:justify-center p-4 md:p-0"
          onClick={() => setShowShareSheet(false)}
        >
          {/* Desktop/Tablet: Centered Modal */}
          <div
            className="hidden md:block relative rounded-xl p-6 max-w-md w-full border border-[var(--border)] shadow-[0_16px_44px_rgba(0,0,0,0.28)]"
            style={{ backgroundColor: "var(--modal-surface)" }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              onClick={() => setShowShareSheet(false)}
              className="absolute top-4 right-4 text-[var(--muted)] hover:text-[var(--text)]"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-bold mb-1">Share Product</h3>
            <p className="text-sm text-[var(--muted)] mb-4 line-clamp-2">{title}</p>

            <div className="grid grid-cols-3 gap-2.5 mb-4">
              <button
                onClick={() =>
                  openShareLink(`https://wa.me/?text=${encodeURIComponent(`${title} ${productUrl}`)}`)
                }
                className="p-3 rounded-lg border border-[var(--border)] hover:border-[var(--primary)] transition flex flex-col items-center gap-1.5 text-xs"
              >
                <MessageCircle size={17} />
                WhatsApp
              </button>
              <button
                onClick={() =>
                  openShareLink(
                    `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(
                      `Check this product: ${productUrl}`,
                    )}`,
                  )
                }
                className="p-3 rounded-lg border border-[var(--border)] hover:border-[var(--primary)] transition flex flex-col items-center gap-1.5 text-xs"
              >
                <Mail size={17} />
                Email
              </button>
              <button
                onClick={() => openShareLink(`https://www.instagram.com/?url=${encodeURIComponent(productUrl)}`)}
                className="p-3 rounded-lg border border-[var(--border)] hover:border-[var(--primary)] transition flex flex-col items-center gap-1.5 text-xs"
              >
                <Camera size={17} />
                Instagram
              </button>
            </div>

            <p className="text-xs text-[var(--muted)] mb-2">Product URL</p>
            <div className="rounded-lg border border-[var(--border)] p-2.5 flex items-start gap-2">
              <p className="text-xs flex-1 break-all">{productUrl}</p>
              <button
                onClick={handleCopyLink}
                className="px-2.5 py-1.5 rounded-md border border-[var(--border)] hover:border-[var(--primary)] transition text-xs inline-flex items-center gap-1"
              >
                <Link2 size={13} />
                Copy
              </button>
            </div>
            {copyMessage && <p className="mt-2 text-xs text-[var(--primary)]">{copyMessage}</p>}
          </div>

          {/* Mobile: Bottom Sheet */}
          <div
            className="md:hidden fixed bottom-0 left-0 right-0 max-h-[82vh] rounded-t-2xl border-t border-[var(--border)] shadow-2xl flex flex-col z-[131]"
            style={{ backgroundColor: "var(--modal-surface)" }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex-shrink-0 p-4 flex items-center justify-between border-b border-[var(--border)]">
              <h3 className="text-lg font-bold">Share Product</h3>
              <button
                onClick={() => setShowShareSheet(false)}
                className="text-[var(--muted)] hover:text-[var(--text)]"
              >
                <X size={20} />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 p-4 pb-[calc(env(safe-area-inset-bottom)+7rem)]">
              <p className="text-sm text-[var(--muted)] mb-4 line-clamp-2">{title}</p>

              <p className="text-xs text-[var(--muted)] font-semibold mb-3">SHARE VIA</p>
              <div className="grid grid-cols-3 gap-3 mb-6">
                <button
                  onClick={() =>
                    openShareLink(`https://wa.me/?text=${encodeURIComponent(`${title} ${productUrl}`)}`)
                  }
                  className="p-4 rounded-lg border border-[var(--border)] hover:border-[var(--primary)] active:bg-[var(--accent)] transition flex flex-col items-center gap-2"
                >
                  <MessageCircle size={20} />
                  <span className="text-xs font-medium">WhatsApp</span>
                </button>
                <button
                  onClick={() =>
                    openShareLink(
                      `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(
                        `Check this product: ${productUrl}`,
                      )}`,
                    )
                  }
                  className="p-4 rounded-lg border border-[var(--border)] hover:border-[var(--primary)] active:bg-[var(--accent)] transition flex flex-col items-center gap-2"
                >
                  <Mail size={20} />
                  <span className="text-xs font-medium">Email</span>
                </button>
                <button
                  onClick={() => openShareLink(`https://www.instagram.com/?url=${encodeURIComponent(productUrl)}`)}
                  className="p-4 rounded-lg border border-[var(--border)] hover:border-[var(--primary)] active:bg-[var(--accent)] transition flex flex-col items-center gap-2"
                >
                  <Camera size={20} />
                  <span className="text-xs font-medium">Instagram</span>
                </button>
              </div>

              <p className="text-xs text-[var(--muted)] font-semibold mb-2">PRODUCT URL</p>
              <div className="rounded-lg border border-[var(--border)] p-3 flex items-center gap-2 bg-[var(--accent)]">
                <p className="text-xs flex-1 break-all">{productUrl}</p>
                <button
                  onClick={handleCopyLink}
                  className="flex-shrink-0 px-2.5 py-1.5 rounded-md border border-[var(--border)] hover:border-[var(--primary)] transition text-xs inline-flex items-center gap-1 bg-[var(--surface)]"
                >
                  <Link2 size={13} />
                  Copy
                </button>
              </div>
              {copyMessage && <p className="mt-2 text-xs text-[var(--primary)]">{copyMessage}</p>}
            </div>
          </div>
        </div>
      )}

      {showPackSelection && (
        <div
          className="fixed inset-0 z-[130] lg:pt-[80px]"
          onClick={() => setShowPackSelection(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Desktop/Tablet: Right Drawer */}
          <div
            className="hidden md:flex absolute right-0 top-0 h-full w-96 flex-col border-l border-[var(--border)] shadow-2xl"
            style={{ backgroundColor: "var(--modal-surface)" }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              onClick={() => setShowPackSelection(false)}
              className="absolute top-4 right-4 text-[var(--muted)] hover:text-[var(--text)] z-10"
            >
              <X size={24} />
            </button>

            <div className="p-6 md:p-8 overflow-y-auto flex-1 flex flex-col">
              <h3 className="text-2xl font-bold mb-2 pr-8">Select Pack Size</h3>
              <p className="text-[var(--muted)] mb-6">Choose how many items you want</p>

              <div className="space-y-3 mb-6">
                {PACK_OPTIONS.map((pack) => (
                  <button
                    key={pack}
                    onClick={() => setSelectedPack(pack)}
                    className="w-full p-4 rounded-lg border-2 transition duration-300 hover:scale-102 text-left flex justify-between items-center"
                    style={{
                      borderColor: selectedPack === pack ? "var(--primary)" : "var(--border)",
                      backgroundColor: selectedPack === pack ? "var(--accent)" : "transparent",
                      color: "var(--text)",
                    }}
                  >
                    <div>
                      <div className="font-bold text-lg">Pack of {pack}</div>
                      <div className="text-sm text-[var(--muted)]">Rs {price * pack}</div>
                    </div>
                    {selectedPack === pack && (
                      <div className="w-5 h-5 rounded-full bg-[var(--primary)]" />
                    )}
                  </button>
                ))}
              </div>

              <div className="text-sm text-[var(--muted)] p-4 rounded-lg bg-[var(--accent)]">
                <p>Price per unit: Rs {price}</p>
                <p className="font-semibold text-[var(--text)] mt-1">Total: Rs {price * selectedPack}</p>
              </div>
            </div>

            <div className="flex-shrink-0 p-6 md:p-8 border-t border-[var(--border)] sticky bottom-0" style={{ backgroundColor: "var(--modal-surface)" }}>
              <button
                onClick={() => {
                  handlePackSelect(selectedPack);
                }}
                className="w-full py-3 rounded-lg font-semibold transition duration-300 ease-out active:scale-95"
                style={{
                  backgroundColor: "var(--primary)",
                  color: "var(--bg)",
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>

          {/* Mobile: Bottom Sheet */}
          <div
            className="md:hidden fixed bottom-0 left-0 right-0 max-h-[82vh] rounded-t-2xl border-t border-[var(--border)] shadow-2xl z-[131] flex flex-col"
            style={{ backgroundColor: "var(--modal-surface)" }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex-shrink-0 p-4 flex items-center justify-between border-b border-[var(--border)]">
              <h3 className="text-xl font-bold">Select Pack Size</h3>
              <button
                onClick={() => setShowPackSelection(false)}
                className="text-[var(--muted)] hover:text-[var(--text)]"
              >
                <X size={24} />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 p-4 pb-4 space-y-3">
              {PACK_OPTIONS.map((pack) => (
                <button
                  key={pack}
                  onClick={() => setSelectedPack(pack)}
                  className="w-full p-4 rounded-lg border-2 transition duration-300 active:scale-95 text-left flex justify-between items-center"
                  style={{
                    borderColor: selectedPack === pack ? "var(--primary)" : "var(--border)",
                    backgroundColor: selectedPack === pack ? "var(--accent)" : "transparent",
                    color: "var(--text)",
                  }}
                >
                  <div>
                    <div className="font-bold text-lg">Pack of {pack}</div>
                    <div className="text-sm text-[var(--muted)]">Rs {price * pack}</div>
                  </div>
                  {selectedPack === pack && (
                    <div className="w-5 h-5 rounded-full bg-[var(--primary)]" />
                  )}
                </button>
              ))}

              <div className="text-sm text-[var(--muted)] p-4 rounded-lg bg-[var(--accent)]">
                <p>Price per unit: Rs {price}</p>
                <p className="font-semibold text-[var(--text)] mt-1">Total: Rs {price * selectedPack}</p>
              </div>
            </div>

            <div className="flex-shrink-0 p-4 border-t border-[var(--border)] sticky bottom-0 pb-[calc(env(safe-area-inset-bottom)+1rem)]" style={{ backgroundColor: "var(--modal-surface)" }}>
              <button
                onClick={() => {
                  handlePackSelect(selectedPack);
                }}
                className="w-full py-3 rounded-lg font-semibold transition duration-300 ease-out active:scale-95"
                style={{
                  backgroundColor: "var(--primary)",
                  color: "var(--bg)",
                }}
                >
                  Add to Cart
                </button>
            </div>
          </div>
        </div>
      )}

      {showImageModal && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center backdrop-blur-sm p-4"
          onClick={() => setShowImageModal(false)}
        >
          <div className="relative w-full max-w-2xl max-h-[90vh]" onClick={(event) => event.stopPropagation()}>
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute -top-10 right-0 md:top-4 md:right-4 p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition duration-300 z-50"
            >
              <X size={24} className="text-white" />
            </button>

            <div className="relative bg-black rounded-lg overflow-hidden">
              <img
                src={allImages[modalImageIndex]}
                alt={title}
                className="w-full h-full object-contain max-h-[75vh]"
              />

              {allImages.length > 1 && (
                <>
                  <button
                    onClick={handleModalPrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition duration-300"
                  >
                    <ChevronLeft size={24} className="text-white" />
                  </button>
                  <button
                    onClick={handleModalNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition duration-300"
                  >
                    <ChevronRight size={24} className="text-white" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full">
                    <span className="text-white text-sm font-medium">
                      {modalImageIndex + 1} / {allImages.length}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductCard;

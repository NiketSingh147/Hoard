import { House, MoonStar, Baby, Sparkles, Gem, Radar } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const NAV_ITEMS = [
  { label: "Home", slug: "", icon: House, path: "/" },
  { label: "Night", slug: "night-lights", icon: MoonStar, path: "/night-lights" },
  { label: "Kids", slug: "kids-lights", icon: Baby, path: "/kids-lights" },
  { label: "Divine", slug: "divine", icon: Sparkles, path: "/divine" },
  { label: "MiniAura", slug: "miniaura", icon: Gem, path: "/miniaura" },
  { label: "InSensor", slug: "insensor", icon: Radar, path: "/insensor" },
];

function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (item) => {
    if (item.path === "/") return location.pathname === "/";
    return location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);
  };

  return (
    <div className="lg:hidden fixed bottom-[26px] left-0 right-0 z-[65] w-full">
      <div className="w-full border-t border-[var(--border)] bg-[var(--surface)] backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.22)]">
        <div className="grid grid-cols-6 max-w-4xl mx-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isActive(item);
            return (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className={`py-3 px-1 flex flex-col items-center justify-center gap-1.5 transition ${
                  active ? "text-[var(--primary)]" : "text-[var(--muted)]"
                }`}
              >
                <Icon size={20} className={active ? "scale-110" : ""} />
                <span className="text-[11px] leading-tight font-semibold">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default BottomNav;

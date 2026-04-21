import { useState } from "react";
import { ChevronDown } from "lucide-react";
import categories from "../data/categories";

function CategorySidebar() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <aside className="hidden lg:block w-[260px] h-[calc(100vh-100px)] sticky top-24 p-4 bg-[var(--surface)] backdrop-blur-xl border border-[var(--border)] rounded-xl">

      <h3 className="text-lg font-stencil mb-4 text-[var(--text)]">
        Categories
      </h3>

      <div className="space-y-3">
        {categories.map((cat, i) => (
          <div key={i}>

            {/* Parent */}
            <button
              onClick={() => toggle(i)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-sm hover:bg-[var(--accent)] transition group"
            >
              <span className="group-hover:text-[var(--primary)]">
                {cat.name}
              </span>

              <ChevronDown
                className={`w-4 h-4 transition ${
                  openIndex === i ? "rotate-180 text-[var(--primary)]" : ""
                }`}
              />
            </button>

            {/* Subcategories */}
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === i ? "max-h-40 mt-2" : "max-h-0"
              }`}
            >
              <div className="pl-4 space-y-2">
                {cat.subcategories.map((item, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="block text-xs text-[var(--muted)] hover:text-[var(--primary)] transition"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>

          </div>
        ))}
      </div>
    </aside>
  );
}

export default CategorySidebar;

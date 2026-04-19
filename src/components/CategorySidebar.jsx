import { useState } from "react";
import { ChevronDown } from "lucide-react";
import categoriesMenu from "../data/categoriesMenu";

function CategorySidebar() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <aside className="hidden lg:block w-[260px] h-[calc(100vh-100px)] sticky top-24 p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl">

      <h3 className="text-lg font-stencil mb-4 text-white">
        Categories
      </h3>

      <div className="space-y-3">
        {categoriesMenu.map((cat, i) => (
          <div key={i}>

            {/* Parent */}
            <button
              onClick={() => toggle(i)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-sm hover:bg-purple-500/10 transition group"
            >
              <span className="group-hover:text-purple-400">
                {cat.title}
              </span>

              <ChevronDown
                className={`w-4 h-4 transition ${
                  openIndex === i ? "rotate-180 text-purple-400" : ""
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
                {cat.items.map((item, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="block text-xs text-gray-400 hover:text-purple-400 transition"
                  >
                    {item}
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
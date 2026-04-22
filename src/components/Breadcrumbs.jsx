import { Link } from "react-router-dom";

function Breadcrumbs({ items = [] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs md:text-sm text-[var(--muted)]">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {isLast ? (
                <span className="text-[var(--text)] font-medium">{item.label}</span>
              ) : (
                <Link to={item.to || "/"} className="hover:text-[var(--primary)] transition">
                  {item.label}
                </Link>
              )}
              {!isLast && <span className="text-[var(--muted)]">{">"}</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;

const defaultSpecs = [
  { label: "Brand", value: "Hoard" },
  { label: "Material", value: "Polycarbonate" },
  { label: "Ideal For", value: "Home Decor" },
  { label: "Country Of Origin", value: "India" },
  { label: "Suitable For", value: "Living Rooms, Bedrooms, Offices, Cafes" },
  { label: "Color", value: "White" },
  { label: "Lamp Type", value: "Night Lamp" },
  { label: "Finish Types", value: "Matte Finish" },
  { label: "Switch Type", value: "Plug In" },
];

const defaultHighlights = [
  "Beautifully crafted home decor piece designed to enhance the elegance of any living space.",
  "Made with high-quality materials ensuring durability, long-lasting shine, and premium appearance.",
  "Perfect decorative accent for living rooms, bedrooms, offices, cafes, and reception areas.",
  "Lightweight and easy to place, making it suitable for shelves, tables, showcases, and work desks.",
];

const productMetaById = {
  9: {
    description:
      "White Polycarbonate Gift Light Goddess Lakshmi Ganesha Saraswati for home and workspace ambiance.",
  },
  10: {
    description:
      "Krishna-inspired decorative lamp crafted to add a peaceful and premium glow to your decor.",
  },
  11: {
    description:
      "Durga devotional lamp with rich detailing and warm illumination for festive and daily decor.",
  },
  12: {
    description:
      "Compact MiniAura lamp designed for desks, shelves, and bedside corners with premium finish.",
  },
};

export const getProductMeta = (product) => {
  const override = productMetaById[product.id] || {};

  return {
    description:
      override.description ||
      `${product.title} from Hoard. Premium finish decor lamp crafted for elegant ambient lighting.`,
    specs: override.specs || defaultSpecs,
    highlights: override.highlights || defaultHighlights,
    delivery: {
      eta: "4-7 days",
      returnPolicy: "Easy 5 days return",
      shipping: "Free Delivery",
      ...override.delivery,
    },
  };
};

import { getProductMeta } from "./productMeta";

const categories = [
  {
    name: "Night Lights",
    slug: "night-lights",
    image: "/categories/nightLight.png",
    hoverImage: "/categories/offnightLight.png",
    subcategories: [
      {
        name: "Hexagon",
        slug: "hexagon",
            image: "/images/hero3.webp",
        products: [
          {
            id: 1,
            title: "Hexagon LED Night Lamp bada text likho bhai sabahabshsjj",
            price: 499,
            originalPrice: 999,
            discount: "50% OFF",
            image: "/images/hero3.webp",
            images: ["/images/hero3.webp", "/images/hero3.webp", "/images/hero3.webp"],
            rating: 4.5,
            reviewCount: 1203,
            bestseller: true,
          },
          {
            id: 2,
            title: "Hexagon Smart Night Lamp",
            price: 599,
            originalPrice: 1199,
            discount: "50% OFF",
            image: "/images/hero3.webp",
            images: ["/images/hero3.webp", "/images/hero3.webp"],
            rating: 4.3,
            reviewCount: 856,
          },
        ],
      },
      {
        name: "Square",
        slug: "square",
            image: "/images/hero3.webp",
        products: [
          {
            id: 3,
            title: "Square Color Night Lamp",
            price: 399,
            originalPrice: 799,
            discount: "50% OFF",
            image: "/images/hero3.webp",
            images: ["/images/hero3.webp", "/images/hero3.webp"],
            rating: 4.2,
            reviewCount: 745,
          },
          {
            id: 4,
            title: "Square Ambient Night Lamp",
            price: 449,
            originalPrice: 899,
            discount: "50% OFF",
            image: "/images/hero3.webp",
            images: ["/images/hero3.webp", "/images/hero3.webp", "/images/hero3.webp"],
            rating: 4.7,
            reviewCount: 2134,
            bestseller: true,
          },
        ],
      },
      {
        name: "Circle",
        slug: "circle",
            image: "/images/hero3.webp",
        products: [
          {
            id: 5,
            title: "Circle Starry Night Lamp",
            price: 549,
            originalPrice: 1099,
            discount: "50% OFF",
            image: "/images/hero5.webp",
            images: ["/images/hero3.webp", "/images/hero3.webp"],
            rating: 4.4,
            reviewCount: 923,
          },
          {
            id: 6,
            title: "Circle Moon Night Lamp",
            price: 499,
            originalPrice: 999,
            discount: "50% OFF",
            image: "/images/hero3.webp",
            images: ["/images/hero3.webp", "/images/hero3.webp", "/images/hero3.webp"],
            rating: 4.6,
            reviewCount: 1567,
            bestseller: true,
          },
        ],
      },
    ],
  },
  {
    name: "Kids Lights",
    slug: "kids-lights",
    image: "/categories/kids.png",
    subcategories: [
      {
        name: "Boys",
        slug: "boys",
            image: "/images/hero3.webp",
        products: [
          {
            id: 7,
            title: "Rocket Kids Lamp",
            price: 649,
            originalPrice: 1299,
            discount: "50% OFF",
            image: "/images/hero3.webp",
            images: ["/images/hero3.webp", "/images/hero3.webp"],
            rating: 4.4,
            reviewCount: 512,
          },
          {
            id: 16,
            title: "Space Shuttle Kids Lamp",
            price: 689,
            originalPrice: 1349,
            discount: "49% OFF",
            image: "/images/hero3.webp",
            images: ["/images/hero3.webp", "/images/hero3.webp", "/images/hero3.webp"],
            rating: 4.8,
            reviewCount: 1891,
            bestseller: true,
          },
        ],
      },
      {
        name: "Girls",
        slug: "girls",
            image: "/images/hero3.webp",
        products: [
          {
            id: 8,
            title: "Princess Castle Night Lamp",
            price: 559,
            originalPrice: 1099,
            discount: "49% OFF",
            image: "/images/hero3.webp",
            images: ["/images/hero3.webp", "/images/hero3.webp"],
            rating: 4.5,
            reviewCount: 734,
            
          },
          {
            id: 17,
            title: "Unicorn Dream Lamp",
            price: 579,
            originalPrice: 1149,
            discount: "50% OFF",
            image: "/images/hero3.webp",
            images: ["/images/hero3.webp", "/images/hero3.webp"],
            rating: 4.6,
            reviewCount: 1045,
          },
        ],
      },
    ],
  },
  {
    name: "Divine",
    slug: "divine",
    image: "/categories/divine.png",
    subcategories: [
      {
        name: "Lord Ganesh",
        slug: "lord-ganesh",
            image: "/images/hero3.webp",
        products: [
          {
            id: 9,
            title: "Lord Ganesh Divine Lamp",
            price: 799,
            originalPrice: 1499,
            discount: "47% OFF",
            image: "/images/hero3.webp",
            images: ["/images/hero3.webp", "/images/hero3.webp"],
            rating: 4.7,
            reviewCount: 1423,
          },
          {
            id: 18,
            title: "Ganesh Aura Glow Lamp",
            price: 869,
            originalPrice: 1599,
            discount: "45% OFF",
            image: "/images/hero3.webp",
            images: ["/images/hero3.webp", "/images/hero3.webp"],
            rating: 4.5,
            reviewCount: 892,
          },
        ],
      },
      {
        name: "Lord Krishna",
        slug: "lord-krishna",
            image: "/images/hero3.webp",
        products: [
          {
            id: 10,
            title: "Lord Krishna Divine Lamp",
            price: 829,
            originalPrice: 1599,
            discount: "48% OFF",
            image: "/images/hero3.webp",
            images: ["/images/hero3.webp", "/images/hero3.webp"],
            rating: 4.6,
            reviewCount: 1156,
          },
          {
            id: 19,
            title: "Krishna Flute Serenity Lamp",
            price: 899,
            originalPrice: 1699,
            discount: "47% OFF",
            image: "/images/hero3.webp",
            images: ["/images/hero3.webp", "/images/hero3.webp"],
            rating: 4.7,
            reviewCount: 1378,
          },
        ],
      },
      {
        name: "Durga Ji",
        slug: "durga-ji",
            image: "/images/hero3.webp",
        products: [
          {
            id: 11,
            title: "Durga Ji Divine Lamp",
            price: 849,
            originalPrice: 1699,
            discount: "50% OFF",
            image: "/images/hero3.webp",
            images: ["/images/hero3.webp", "/images/hero3.webp"],
            rating: 4.8,
            reviewCount: 1634,
          },
          {
            id: 20,
            title: "Durga Blessings Lamp",
            price: 919,
            originalPrice: 1799,
            discount: "49% OFF",
            image: "/images/hero3.webp",
            images: ["/images/hero3.webp", "/images/hero3.webp"],
            rating: 4.4,
            reviewCount: 789,
          },
        ],
      },
    ],
  },
  {
    name: "MiniAura",
    slug: "miniaura",
    image: "/categories/miniaura.png",
    subcategories: [
      {
        name: "All MiniAura",
        slug: "all-miniaura",
            image: "/images/hero3.webp",
        products: [
          {
            id: 12,
            title: "MiniAura Glow Lamp",
            price: 469,
            originalPrice: 899,
            discount: "48% OFF",
            image: "/images/hero3.webp",
            
          },
          {
            id: 21,
            title: "MiniAura Desk Mood Lamp",
            price: 489,
            originalPrice: 949,
            discount: "48% OFF",
            image: "/images/hero3.webp",
          },
        ],
      },
    ],
  },
  {
    name: "InSensor",
    slug: "insensor",
    image: "/categories/insensor.png",
    subcategories: [
      {
        name: "Motion",
        slug: "motion",
            image: "/images/hero3.webp",
        products: [
          {
            id: 13,
            title: "Motion Sensor Lamp",
            price: 729,
            originalPrice: 1399,
            discount: "48% OFF",
            image: "/images/hero3.webp",
          },
          {
            id: 22,
            title: "Motion Beam Night Lamp",
            price: 759,
            originalPrice: 1449,
            discount: "48% OFF",
            image: "/images/hero3.webp",
            
          },
        ],
      },
      {
        name: "Auto On/Off",
        slug: "auto-on-off",
            image: "/images/hero3.webp",
        products: [
          {
            id: 14,
            title: "Auto On/Off Sensor Lamp",
            price: 699,
            originalPrice: 1299,
            discount: "46% OFF",
            image: "/images/hero3.webp",
          },
          {
            id: 23,
            title: "Smart Auto Sensor Lamp",
            price: 739,
            originalPrice: 1369,
            discount: "46% OFF",
            image: "/images/hero3.webp",
          },
        ],
      },
      {
        name: "Energy Saver",
        slug: "energy-saver",
            image: "/images/hero3.webp",
        products: [
          {
            id: 15,
            title: "Energy Saver Sensor Lamp",
            price: 679,
            originalPrice: 1249,
            discount: "45% OFF",
            image: "/images/hero3.webp",
          },
          {
            id: 24,
            title: "Eco Saver Motion Lamp",
            price: 709,
            originalPrice: 1329,
            discount: "47% OFF",
            image: "/images/hero3.webp",
          },
        ],
      },
    ],
  },
];

export const getAllProducts = () =>
  categories.flatMap((category) =>
    category.subcategories.flatMap((subcategory) =>
      subcategory.products.map((product) => ({
        ...product,
        ...getProductMeta(product),
        categorySlug: category.slug,
        categoryName: category.name,
        subcategorySlug: subcategory.slug,
        subcategoryName: subcategory.name,
      })),
    ),
  );

export const getProductsBySelection = (activeCategorySlug, activeSubcategorySlug) => {
  if (!activeCategorySlug) {
    return getAllProducts();
  }

  const category = categories.find((item) => item.slug === activeCategorySlug);
  if (!category) return [];

  if (!activeSubcategorySlug) {
    return category.subcategories.flatMap((subcategory) =>
      subcategory.products.map((product) => ({
        ...product,
        ...getProductMeta(product),
        categorySlug: category.slug,
        categoryName: category.name,
        subcategorySlug: subcategory.slug,
        subcategoryName: subcategory.name,
      })),
    );
  }

  const subcategory = category.subcategories.find(
    (item) => item.slug === activeSubcategorySlug,
  );
  if (!subcategory) return [];

  return subcategory.products.map((product) => ({
    ...product,
    ...getProductMeta(product),
    categorySlug: category.slug,
    categoryName: category.name,
    subcategorySlug: subcategory.slug,
    subcategoryName: subcategory.name,
  }));
};

export const getCategoryBySlug = (categorySlug) =>
  categories.find((category) => category.slug === categorySlug) || null;

export const getSubcategoryBySlug = (categorySlug, subSlug) => {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return null;
  return category.subcategories.find((subcategory) => subcategory.slug === subSlug) || null;
};

export const getCategoryProducts = (categorySlug) =>
  getProductsBySelection(categorySlug, null);

export const getSubcategoryProducts = (categorySlug, subSlug) =>
  getProductsBySelection(categorySlug, subSlug);

export const getProductById = (productId) =>
  getAllProducts().find((product) => String(product.id) === String(productId)) || null;

export default categories;

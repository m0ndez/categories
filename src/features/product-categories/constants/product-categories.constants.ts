import { Product } from "../types";

export const ITEMS_PER_PAGE = 5;

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    productName: "Bluetooth Speaker",
    category: "Audio",
    price: 1890,
    status: "In Stock",
    updatedDate: "2025-11-15T11:12:55",
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
    description:
      "High-quality portable Bluetooth speaker with 360° sound, waterproof design, and 12-hour battery life. Perfect for outdoor activities and home entertainment.",
  },
  {
    id: 2,
    productName: "USB-C Dock",
    category: "Display",
    price: 990,
    status: "Out of Stock",
    updatedDate: "2025-11-10T11:12:55",
    image:
      "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=400&fit=crop",
    description:
      "Multi-port USB-C hub with HDMI output, USB 3.0 ports, SD card reader, and power delivery. Ideal for laptops and tablets.",
  },
  {
    id: 3,
    productName: 'Monitor 27"',
    category: "Accessory",
    price: 15888,
    status: "Out of Stock",
    updatedDate: "2025-11-11T11:12:55",
    image:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop",
    description:
      "27-inch 4K UHD monitor with IPS panel, 99% sRGB color gamut, HDR support, and adjustable stand. Perfect for creative professionals.",
  },
  {
    id: 4,
    productName: "Wireless headphones",
    category: "Audio",
    price: 2398,
    status: "In Stock",
    updatedDate: "2025-11-15T11:12:55",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    description:
      "Premium wireless headphones with active noise cancellation, 30-hour battery life, and superior sound quality. Comfortable for all-day wear.",
  },
  {
    id: 5,
    productName: "Mechanical Keyboard",
    category: "Keyboard",
    price: 4325,
    status: "In Stock",
    updatedDate: "2025-11-11T11:12:55",
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop",
    description:
      "RGB mechanical keyboard with hot-swappable switches, aluminum frame, and customizable key mapping. Cherry MX switches for optimal typing experience.",
  },
  {
    id: 6,
    productName: "Wireless Mouse",
    category: "Accessory",
    price: 890,
    status: "In Stock",
    updatedDate: "2025-11-14T09:30:00",
    image:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
    description:
      "Ergonomic wireless mouse with adjustable DPI, programmable buttons, and long battery life. Perfect for productivity and gaming.",
  },
  {
    id: 7,
    productName: "USB Microphone",
    category: "Audio",
    price: 3450,
    status: "In Stock",
    updatedDate: "2025-11-16T14:20:00",
    image:
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400&h=400&fit=crop",
    description:
      "Professional USB condenser microphone with cardioid pattern, zero-latency monitoring, and plug-and-play setup. Ideal for podcasting and streaming.",
  },
  {
    id: 8,
    productName: "Laptop Stand",
    category: "Accessory",
    price: 1250,
    status: "Out of Stock",
    updatedDate: "2025-11-12T08:15:00",
    image:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
    description:
      "Adjustable aluminum laptop stand with ventilation design. Improves posture and keeps your laptop cool during extended use.",
  },
  {
    id: 9,
    productName: "Gaming Keyboard",
    category: "Keyboard",
    price: 5890,
    status: "In Stock",
    updatedDate: "2025-11-17T10:45:00",
    image:
      "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop",
    description:
      "Full-featured gaming keyboard with per-key RGB lighting, dedicated macro keys, and aircraft-grade aluminum construction. Tournament-grade performance.",
  },
  {
    id: 10,
    productName: "Webcam HD",
    category: "Display",
    price: 2190,
    status: "In Stock",
    updatedDate: "2025-11-13T16:00:00",
    image:
      "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=400&fit=crop",
    description:
      "1080p HD webcam with auto-focus, built-in microphone, and wide-angle lens. Perfect for video conferencing and content creation.",
  },
  {
    id: 11,
    productName: "Portable SSD 1TB",
    category: "Accessory",
    price: 3890,
    status: "In Stock",
    updatedDate: "2025-11-15T12:30:00",
    image:
      "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=400&fit=crop",
    description:
      "Ultra-fast portable SSD with USB 3.2 Gen 2 interface, shock-resistant design, and password protection. Transfer speeds up to 1050MB/s.",
  },
  {
    id: 12,
    productName: "Desk Pad",
    category: "Accessory",
    price: 590,
    status: "Out of Stock",
    updatedDate: "2025-11-09T11:00:00",
    image:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
    description:
      "Large premium desk pad with stitched edges, waterproof surface, and non-slip rubber base. Protects your desk and provides smooth mouse movement.",
  },
];

export const MOCK_CATEGORIES: string[] = [
  "Audio",
  "Display",
  "Accessory",
  "Keyboard",
];

import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Novus Solutions",
    short_name: "Novus",
    description:
      "Technology and business growth for auto shops in Chicago — websites, AI assistants, and follow-up systems.",
    start_url: "/",
    display: "standalone",
    background_color: "#05070E",
    theme_color: "#080C18",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}

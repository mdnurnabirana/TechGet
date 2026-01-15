import localFont from "next/font/local";

export const baiJamjuree = localFont({
  src: [
    {
      path: "../fonts/BaiJamjuree-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/BaiJamjuree-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/BaiJamjuree-BoldItalic.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/BaiJamjuree-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/BaiJamjuree-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-bai-jamjuree",
});
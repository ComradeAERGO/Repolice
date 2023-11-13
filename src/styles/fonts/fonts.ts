import { Inter, Space_Grotesk, Rufina, Mate, Caudex } from "next/font/google";
import localFont from "next/font/local";

// Variable Fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
const space_Grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});
const mate = Mate({
  subsets: ["latin"],
  variable: "--font-mate",
  weight: "400",
});
const rufina = Rufina({
  subsets: ["latin"],
  variable: "--font-rufina",
  weight: "400",
});
const caudex = Caudex({
  subsets: ["latin"],
  variable: "--font-caudex",
  weight: "400",
});

// Non-Variable Fonts
const bodyFont = localFont({
  variable: "--font-bodyfont",
  src: [
    {
      path: "./BodyFont/Body-Grotesque-Bold-trial.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./BodyFont/Body-Grotesque-Fit-Bold-trial.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./BodyFont/Body-Grotesque-Large-Bold-trial.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./BodyFont/Body-Grotesque-Slim-Bold-trial.ttf",
      weight: "300",
      style: "normal",
    },
  ],
});
const garcia = localFont({
  src: "./Garcia/fonts/GARCIA-Regular.otf",
  variable: "--font-garcia",
});
const helmet = localFont({
  src: "./Helmet/Helmet-Regular.ttf",
  variable: "--font-helmet",
});
const lack = localFont({
  src: [
    {
      path: "./Lack/Webfonts/Lack-Italic.woff2",
      style: "italic",
    },
    {
      path: "./Lack/Webfonts/Lack-Regular.woff2",
      style: "normal",
    },
  ],
  variable: "--font-lack",
});

export {
  inter,
  space_Grotesk,
  garcia,
  helmet,
  lack,
  bodyFont,
  mate,
  rufina,
  caudex,
};

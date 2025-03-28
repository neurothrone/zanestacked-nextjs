import { Orbitron, Roboto } from "next/font/google";

export const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});
export const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "700"],
});

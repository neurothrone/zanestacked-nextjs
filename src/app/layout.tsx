import { Orbitron } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
    <body className={`${orbitron.variable} ${orbitron.className} antialiased`}>
      {children}
    </body>
    </html>
  );
}

import "./globals.css";
import { roboto } from "@/src/ui/fonts";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
    <body className={`${roboto.variable} ${roboto.className} antialiased`}>
      {children}
    </body>
    </html>
  );
}

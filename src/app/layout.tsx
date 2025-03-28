import "@/src/ui/globals.css";
import { roboto } from "@/src/ui/fonts";

const RootLayout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
    <body className={`${roboto.variable} ${roboto.className} antialiased`}>
      {children}
    </body>
    </html>
  );
}

export default RootLayout;

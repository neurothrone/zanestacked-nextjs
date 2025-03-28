import { Metadata } from "next";
import { roboto } from "@/src/ui/fonts";
import "@/src/ui/globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | ZaneStacked",
    default: "ZaneStacked",
  },
  description: "ZaneStacked – A futuristic, comedic full-stack portfolio built with Next.js. Explore projects, skills, and existential humor in a sleek, interactive portfolio.",
  metadataBase: new URL("https://neurothrone.tech"),
};

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

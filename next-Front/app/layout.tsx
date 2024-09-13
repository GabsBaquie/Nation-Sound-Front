import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Nation Sound</title>
        <meta
          name="description"
          content="Découvrez une programmation riche et éclectique dans un cadre idyllique"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}

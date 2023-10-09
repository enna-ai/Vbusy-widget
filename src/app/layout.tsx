import "@/styles/main.scss";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Vbusy Widget",
  description: "Vbusy widget builder",
  icons: "favicon.ico",
  themeColor: "#a44a3f",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}

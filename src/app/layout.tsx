import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { QueryClientProvider } from "@/components/providers/query-client-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Einer WM",
  description: "Euro 24 - Germany",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={`${inter.className} p-2`}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <QueryClientProvider>{children}</QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

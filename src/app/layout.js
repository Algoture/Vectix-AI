import { ThemeProvider } from "@/components/ui/theme-provider";
import Header from "@/components/custom/Header";
import Footer from "@/components/custom/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Vectix AI",
  description: "Vectix AI your career Coach",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${inter.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className="">{children}</main>
          </ThemeProvider>
          <Toaster richColors />
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}

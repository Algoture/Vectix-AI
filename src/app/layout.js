import Header from "@/components/custom/Header";
import Footer from "@/components/custom/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { dark } from "@clerk/themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Vectix AI",
  description: "Vectix AI your career Coach",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{
      baseTheme: dark,
    }}>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${inter.variable} antialiased`}
        >
          <Header />
          <main className="">{children}</main>
          <Toaster richColors />
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}

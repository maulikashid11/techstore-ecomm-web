import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ReduxProvider from "@/providers/ReduxProvider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Techstore - Your One-Stop Shop for Electronics",
  description: "Discover the latest in electronics at Techstore. From cutting-edge gadgets to essential accessories, we have everything you need to stay connected and ahead of the curve.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Toaster/>
          <ReduxProvider>
            {children}
          </ReduxProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

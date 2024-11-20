import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Avatar Kranti E-Paper",
  description: "Avatar Kranti E-Paper",
  openGraph: {
    type: "website",
    url: "https://avatar-kranti.vercel.app/",
    title: "Avatar Kranti E-Paper",
    description: "Avatar Kranti E-Paper",
    images: [{ url: "/assets/logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Next.js",
    description: "The React Framework for the Web",
    creator: "Bhanu",
    images: ["/assets/thumbnail.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="min-h-screen bg-zinc-200">
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

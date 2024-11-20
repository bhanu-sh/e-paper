import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Avatar Kranti E-Paper",
  description: "Stay updated with Avatar Kranti E-Paper, your go-to source for the latest news.",
  openGraph: {
    type: "website",
    url: "https://avatarkranti.vercel.app/",
    title: "Avatar Kranti E-Paper",
    description: "Stay updated with Avatar Kranti E-Paper, your go-to source for the latest news.",
    images: [{ url: "https://avatarkranti.vercel.app/assets/thumbnail.png" }],
  },
  twitter: {
    card: "summary_large_image", // Ensures a large preview card on Twitter
    site: "@YourTwitterHandle", // Replace with your site's Twitter username
    creator: "@Bhanu", // Replace with your personal Twitter username
    title: "Avatar Kranti E-Paper",
    description: "Stay updated with Avatar Kranti E-Paper, your go-to source for the latest news.",
    images: [{ url: "https://avatarkranti.vercel.app/assets/thumbnail.png" }],
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

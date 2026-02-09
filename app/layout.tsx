import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Azriella — Kids & Family African-Inspired Fashion (Canada)",
  description: "Discover vibrant African-inspired fashion for kids and families. Bold prints, premium quality, and comfortable styles that celebrate culture and creativity."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-neutral-50 text-neutral-900">
        <Header />
        <main className="mx-auto max-w-6xl px-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

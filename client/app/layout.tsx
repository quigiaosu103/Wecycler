import "./globals.css";
import Providers from "@/context/Providers";
import Footer from "../components/Footer";
import Header from "../components/Header";

export const metadata = {
  title: "Wecycler",
  description: "Let cycler with us!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="">
        <Providers>
          <Header />
          <div className="fit">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

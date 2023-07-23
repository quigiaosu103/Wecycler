import Providers from "@/context/Providers";
import Footer from "./Footer";
import "./globals.css";
import Header from "./Header";

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
          <div className="">
            <Header />
          </div>
          <div className="fit">{children}</div>
          <div className=" border-t border-gray-400 shadow-t shadow-md">
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}

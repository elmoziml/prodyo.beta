import Header from "../../../components/public/Header";
import Footer from "../../../components/public/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
        <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
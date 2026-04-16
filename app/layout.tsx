import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";

export const metadata: Metadata = {
  title: "Visualizar Calhas",
  description: "Visualização aérea de falhas em calhas por bloco do condomínio.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="min-h-screen bg-surface-base text-surface-text antialiased">
        <Header />
        <main className="mx-auto w-full max-w-[1400px] px-4 pb-8 pt-6 sm:px-6 lg:px-8">{children}</main>
      </body>
    </html>
  );
}

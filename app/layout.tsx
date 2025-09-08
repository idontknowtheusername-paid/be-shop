import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { UserProvider } from '@/contexts/UserContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Be Shop - Benin Elite Shopping Experience',
  description: 'Premium e-commerce platform for Benin. Shop electronics, fashion, home & garden, beauty, sports and more with fast delivery across Benin.',
  keywords: 'ecommerce, Benin, shopping, electronics, fashion, home, beauty, delivery',
  authors: [{ name: 'Be Shop' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          {children}
          <Toaster />
        </UserProvider>
      </body>
    </html>
  );
}
"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { getTheme, saveTheme } from "@/lib/storage";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = getTheme();
    setTheme(savedTheme);
    setMounted(true);
  }, []);

  useEffect(() => {
    // Apply theme to document
    if (mounted) {
      document.documentElement.classList.toggle('dark', theme === 'dark');
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    saveTheme(newTheme);
  };

  if (!mounted) {
    return (
      <html lang="en">
        <body className={inter.className}>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-indigo-950 dark:to-gray-900">
            <div className="flex items-center justify-center min-h-screen">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en" className={theme}>
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-indigo-950 dark:to-gray-900">
          {/* Navigation */}
          <nav className="gradient-nav border-b border-white/20 sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center space-x-8">
                  <Link href="/" className="text-xl font-bold text-white hover:text-blue-100 transition-colors">
                    StudyBuddy
                  </Link>
                  <div className="hidden md:flex space-x-6">
                    <Link href="/schedule" className="text-white/90 hover:text-white transition-colors">
                      Schedule
                    </Link>
                    <Link href="/plan" className="text-white/90 hover:text-white transition-colors">
                      Plan
                    </Link>
                    <Link href="/study" className="text-white/90 hover:text-white transition-colors">
                      Study
                    </Link>
                    <Link href="/settings" className="text-white/90 hover:text-white transition-colors">
                      Settings
                    </Link>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleTheme}
                    className="w-9 h-9 p-0 bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    {theme === 'light' ? '🌙' : '☀️'}
                  </Button>
                </div>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>

          {/* Footer */}
          <footer className="gradient-nav border-t border-white/20 mt-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center text-white/80">
                <p>&copy; 2024 StudyBuddy. Made with ❤️ for productive learning.</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}

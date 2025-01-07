import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import styles from './page.module.css';
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <nav className={"navbar navbar-expand-lg navbar-dark shadow" }>
          <div className="container">
            <Link href="/" className="navbar-brand">
              StudyBuddy
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link href="/schedule" className="nav-link">
                    Schedule
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/plan" className="nav-link">
                    Plan
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/study" className="nav-link">
                    Study
                  </Link>
                </li>
                
                <li className="nav-item">
                  <Link href="/login" className="nav-link">
                    Get Started
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}

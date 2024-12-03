// app/root.tsx
import type { MetaFunction, LoaderFunction } from '@remix-run/node';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';

// Clerk imports
import { rootAuthLoader } from '@clerk/remix/ssr.server';
import { ClerkApp } from '@clerk/remix';

// Global styles
import "./globals.css";

export const meta: MetaFunction = () => [
  {
    charset: 'utf-8',
    title: 'AI-Compass - Expert Consultation Platform',
    viewport: 'width=device-width,initial-scale=1',
  },
];

export const loader: LoaderFunction = (args) => rootAuthLoader(args);

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        {/* Glassmorphism background */}
        <div className="fixed inset-0 -z-10 bg-gradient-to-br from-indigo-50 via-white to-cyan-100 dark:from-gray-900 dark:via-gray-900 dark:to-slate-900">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
        </div>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

function App() {
  return <Outlet />;
}

export default ClerkApp(App);
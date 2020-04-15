import React from 'react';
import { Header } from 'components';

export default function Navigation({ children }) {
  return (
    <div className="flex flex-col h-screen">
      <header>
        <Header />
      </header>
      <main className="flex-grow bg-gray-100">{children}</main>
      <footer className="py-4 bg-gray-900 text-center text-white">
        Built with love.
      </footer>
    </div>
  );
}

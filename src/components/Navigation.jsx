import React from 'react';
import { Header } from 'components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Navigation({ children }) {
  return (
    <div className="flex flex-col h-screen">
      <header>
        <Header />
      </header>
      <main className="flex-grow bg-gray-100 py-16">
        {children}
        <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />
      </main>
      <footer className="py-4 bg-gray-900 font-medium text-center text-gray-200">
        2020 - Built with love - Bekasi
      </footer>
    </div>
  );
}

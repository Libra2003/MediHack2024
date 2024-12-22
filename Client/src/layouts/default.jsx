import { Navbar } from "../components/navbar";

export default function DefaultLayout({ children }) {
  return (
    <div className="relative flex flex-col h-screen font-inter">
      <Navbar />
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-4">
        {children}
      </main>
      <footer className="w-full items-center justify-center pb-3">
        <p className="text-center text-gray-500 pt-3">
          &copy; MediLearn 2024 - All rights reserved
        </p>
      </footer>
    </div>
  );
}

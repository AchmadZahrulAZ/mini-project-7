import React, { useState } from 'react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
      <div className="px-6 py-8">
        <div className="fixed z-10 top-0 left-0 py-4 px-6 bg-white/[.3] backdrop-blur-sm w-full flex justify-between items-center">
          <h1 className="text-xl font-bold">APLIKASI MANAJEMEN PRODUK</h1>
          {/* Hamburger menu */}
          <button
            className="block lg:hidden text-xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            &#9776; {/* Icon hamburger */}
          </button>
          {menuOpen && (
            <div className="absolute top-16 right-6 bg-white shadow-lg p-4 rounded-lg flex flex-col gap-2">
              <a href="/" className="hover:underline">Home</a>
              <a href="/createproduct" className="hover:underline">Create Product</a>
              <a href="/editproduct" className="hover:underline">Edit Product</a>
              <a href="/logslist" className="hover:underline">Logs List</a>
              <a href="/productlist" className="hover:underline">Product List</a>
              <a href="/stockin" className="hover:underline">Stock In</a>
              <a href="/stockout" className="hover:underline">Stock Out</a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

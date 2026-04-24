import React, { useState, useEffect } from 'react';
import { User, MessageSquare, Heart, ShoppingCart, Menu, ChevronDown } from 'lucide-react';
import logo from '../assets/Layout/Brand/logo-colored.png';
import flagDE from '../assets/Layout1/Image/flags/DE@2x.png';
import { productAPI } from '../config/product';

const Header = ({ setPage }) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All category');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [categories, setCategories] = useState(['All category']);

  useEffect(() => {
    productAPI.getCategories()
      .then(data => setCategories(['All category', ...data]))
      .catch((err) => console.error('categories error:', err));
  }, []);

  const handleSearch = (cat = selectedCategory) => {
    const params = new URLSearchParams();
    if (query.trim()) params.append('q', query.trim());
    if (cat !== 'All category') params.append('category', cat);
    const queryString = params.toString();
    window.location.href = `/products${queryString ? '?' + queryString : ''}`;
  };

  return (
    <header className="bg-white border-b border-shade-border lg:sticky top-0 z-50 shadow-sm">
      <div className="container py-4 flex items-center justify-between gap-6">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setPage('home')}>
          <img src={logo} alt="Brand" className="h-[46px]" />
        </div>

        <div className="flex-1 max-w-2xl flex border-2 border-primary rounded-lg relative">
          <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
            className="flex-1 px-4 py-2 outline-none"
          />
          <div className="relative">
            <div
              className="flex items-center border-l px-4 py-2 bg-white cursor-pointer hover:bg-gray-50"
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
            >
              <span className="text-sm">{selectedCategory}</span>
              <ChevronDown className="w-4 h-4 ml-2" />
            </div>

            {showCategoryDropdown && (
              <div className="fixed w-48 bg-white border border-[#DEE2E7] shadow-lg z-50 max-h-64 overflow-y-auto">
                {categories.map((cat) => (
                  <div
                    key={cat}
                    className="px-4 py-2 text-sm cursor-pointer hover:bg-[#F7F7F7] transition-colors"
                    onClick={() => {
                      setSelectedCategory(cat);
                      setShowCategoryDropdown(false);
                    }}
                  >
                    {cat}
                  </div>
                ))}
              </div>
            )}
          </div>
          <button
            className="bg-primary hover:bg-primary-dark text-white px-8 py-2 font-medium transition-colors"
            onClick={() => handleSearch()}
          >
            Search
          </button>
        </div>

        <div className="flex items-center gap-6">
          <a href="/admin/add-product" className="text-xs px-3 py-1.5 border border-[#DEE2E7] rounded-md hover:bg-shade">Add Product</a>
          <div className="flex flex-col items-center cursor-pointer text-secondary hover:text-primary transition-colors" onClick={() => setPage('profile')}>
            <User className="w-5 h-5 mb-1" />
            <span className="text-xs">Profile</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer text-secondary hover:text-primary transition-colors" onClick={() => setPage('message')}>
            <MessageSquare className="w-5 h-5 mb-1" />
            <span className="text-xs">Message</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer text-secondary hover:text-primary transition-colors" onClick={() => setPage('orders')}>
            <Heart className="w-5 h-5 mb-1" />
            <span className="text-xs">Orders</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer text-secondary hover:text-primary transition-colors" onClick={() => setPage('cart')}>
            <ShoppingCart className="w-5 h-5 mb-1" />
            <span className="text-xs">My cart</span>
          </div>
        </div>
      </div>

      <div className="border-t border-shade-border bg-white overflow-x-auto lg:overflow-visible no-scrollbar">
        <div className="container py-3 flex items-center justify-between whitespace-nowrap gap-4">
          <nav className="flex items-center gap-6 font-medium text-dark">
            <a href="/products" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Menu className="w-5 h-5" />
              <span>All category</span>
            </a>
            <a href="/products" className="hover:text-primary transition-colors">Hot offers</a>
            <a href="/products" className="hover:text-primary transition-colors">Gift boxes</a>
            <a href="/products" className="hover:text-primary transition-colors">Products</a>
            <a href="/products" className="hover:text-primary transition-colors">Menu item</a>
            <div className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors">
              <span>Help</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          </nav>

          <div className="flex items-center gap-6 font-medium text-dark">
            <div className="flex items-center gap-1 cursor-pointer">
              <span>English, USD</span>
              <ChevronDown className="w-4 h-4 text-secondary" />
            </div>
            <div className="flex items-center gap-1 cursor-pointer">
              <span>Ship to</span>
              <img src={flagDE} alt="DE" className="w-5 h-3 rounded-sm shadow-sm" />
              <ChevronDown className="w-4 h-4 text-secondary" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
import React from 'react';

const AddProductPage = () => {
  return (
    <div className="container py-10">
      <div className="max-w-3xl mx-auto bg-white border border-[#DEE2E7] rounded-lg p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-[#1C1C1C] mb-2">Add Product</h1>
        <p className="text-sm text-[#8B96A5] mb-6">Static admin form page for backend integration.</p>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1 text-[#505050]">Product name</label>
            <input type="text" className="w-full border border-[#DEE2E7] rounded-md px-3 py-2 outline-none focus:border-primary" />
          </div>
          <div>
            <label className="block text-sm mb-1 text-[#505050]">Category</label>
            <input type="text" className="w-full border border-[#DEE2E7] rounded-md px-3 py-2 outline-none focus:border-primary" />
          </div>
          <div>
            <label className="block text-sm mb-1 text-[#505050]">Price</label>
            <input type="number" className="w-full border border-[#DEE2E7] rounded-md px-3 py-2 outline-none focus:border-primary" />
          </div>
          <div>
            <label className="block text-sm mb-1 text-[#505050]">Stock</label>
            <input type="number" className="w-full border border-[#DEE2E7] rounded-md px-3 py-2 outline-none focus:border-primary" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm mb-1 text-[#505050]">Image URL</label>
            <input type="url" className="w-full border border-[#DEE2E7] rounded-md px-3 py-2 outline-none focus:border-primary" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm mb-1 text-[#505050]">Description</label>
            <textarea rows="5" className="w-full border border-[#DEE2E7] rounded-md px-3 py-2 outline-none focus:border-primary" />
          </div>
          <div className="md:col-span-2">
            <button type="button" className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-md font-medium transition-colors">
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductPage;

import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div className="container py-10">
      <div className="max-w-md mx-auto bg-white border border-[#DEE2E7] rounded-lg p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-[#1C1C1C] mb-2">Login</h1>
        <p className="text-sm text-[#8B96A5] mb-6">Static form for backend integration.</p>

        <form className="space-y-4">
          <div>
            <label className="block text-sm mb-1 text-[#505050]">Email</label>
            <input type="email" placeholder="you@example.com" className="w-full border border-[#DEE2E7] rounded-md px-3 py-2 outline-none focus:border-primary" />
          </div>
          <div>
            <label className="block text-sm mb-1 text-[#505050]">Password</label>
            <input type="password" placeholder="********" className="w-full border border-[#DEE2E7] rounded-md px-3 py-2 outline-none focus:border-primary" />
          </div>
          <button type="button" className="w-full bg-primary hover:bg-primary-dark text-white py-2.5 rounded-md font-medium transition-colors">
            Sign in
          </button>
        </form>

        <p className="text-sm text-[#505050] mt-4">
          New here? <Link to="/signup" className="text-primary hover:underline">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

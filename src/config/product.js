import { buildApiUrl } from './api';

export const productAPI = {
  // Get all products
  getAllProducts: async () => {
    const response = await fetch(buildApiUrl('/products'), {
      headers: { 'Accept': 'application/json' },
    });
    if (!response.ok) throw new Error(`Failed to fetch products: ${response.status}`);
    return await response.json();
  },

  // Get product by ID
  getProductById: async (id) => {
    const response = await fetch(buildApiUrl(`/products/${id}`), {
      headers: { 'Accept': 'application/json' },
    });
    if (!response.ok) throw new Error(`Failed to fetch product: ${response.status}`);
    return await response.json();
  },

  // Get products by type
  getProductsByType: async (type) => {
    const response = await fetch(buildApiUrl(`/products_by_type/${type}`), {
      headers: { 'Accept': 'application/json' },
    });
    if (!response.ok) throw new Error(`Failed to fetch products by type: ${response.status}`);
    return await response.json();
  },

  // Get featured products
  getFeaturedProducts: async () => {
    const response = await fetch(buildApiUrl('/featured_products'), {
      headers: { 'Accept': 'application/json' },
    });
    if (!response.ok) throw new Error(`Failed to fetch featured products: ${response.status}`);
    return await response.json();
  },

  // Get recommended products
  getRecommendedProducts: async () => {
    const response = await fetch(buildApiUrl('/recommended_products'), {
      headers: { 'Accept': 'application/json' },
    });
    if (!response.ok) throw new Error(`Failed to fetch recommended products: ${response.status}`);
    return await response.json();
  },

  // Search products
  searchProducts: async (query) => {
    const params = new URLSearchParams();
    if (query) params.append('q', query);
    
    const response = await fetch(buildApiUrl(`/search?${params.toString()}`), {
      headers: { 'Accept': 'application/json' },
    });
    if (!response.ok) throw new Error(`Failed to search products: ${response.status}`);
    return await response.json();
  },

  // Get categories
  getCategories: async () => {
    const response = await fetch(buildApiUrl('/categories'), {
      headers: { 'Accept': 'application/json' },
    });
    if (!response.ok) throw new Error(`Failed to fetch categories: ${response.status}`);
    return await response.json();
  },

  // Create product (admin)
  createProduct: async (productData, token) => {
    const response = await fetch(buildApiUrl('/api/admin/products'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Failed to create product' }));
      throw new Error(error.detail || `Failed to create product: ${response.status}`);
    }

    return await response.json();
  },
};

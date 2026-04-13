const rawApiBaseUrl = import.meta.env.VITE_API_BASE_URL || '/api';

export const API_BASE_URL = rawApiBaseUrl.replace(/\/+$/, '');

export const buildApiUrl = (path = '') => {
  const normalizedPath = String(path).startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
};

export const PRODUCT_DETAILS_BASE_URL = buildApiUrl('/products');
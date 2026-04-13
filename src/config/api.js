const rawApiBaseUrl = import.meta.env.VITE_API_BASE_URL || '/api';

const resolveApiBaseUrl = () => {
  const trimmed = String(rawApiBaseUrl).trim() || '/api';

  // Prevent mixed-content failures when app is served over HTTPS.
  if (typeof window !== 'undefined' && window.location.protocol === 'https:' && trimmed.startsWith('http://')) {
    return '/api';
  }

  return trimmed;
};

export const API_BASE_URL = resolveApiBaseUrl().replace(/\/+$/, '');

export const buildApiUrl = (path = '') => {
  const normalizedPath = String(path).startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
};

export const PRODUCT_DETAILS_BASE_URL = buildApiUrl('/products');
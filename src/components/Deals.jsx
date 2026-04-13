import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { buildApiUrl } from '../config/api';

const HOME_PRODUCTS_API_URL = buildApiUrl('/featured_products');

const Deals = ({ setPage }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const loadProducts = async () => {
      setIsLoading(true);
      setLoadError('');

      try {
        const response = await fetch(HOME_PRODUCTS_API_URL, {
          signal: controller.signal,
          headers: {
            Accept: 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }

        const json = await response.json();
        if (!Array.isArray(json)) {
          throw new Error('Invalid response format');
        }

        const normalized = json
          .map((item, index) => ({
            id: item.id ?? index + 1,
            name: String(item.name || 'Unnamed product').trim(),
            image: String(item.image || '').trim(),
            price: Number(item.price) || 0,
          }))
          .filter((item) => item.name)
          .slice(0, 5);

        if (isMounted) {
          setProducts(normalized);
        }
      } catch {
        if (isMounted) {
          setProducts([]);
          setLoadError('Unable to load deals from /api/featured_products');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <section className="bg-white border border-[#DEE2E7] rounded-lg mt-6 flex overflow-hidden">
      {/* Timer Section */}
      <div className="w-72 p-6 border-r border-[#DEE2E7] flex flex-col justify-center">
        <h3 className="text-xl font-bold text-dark mb-1">Deals and offers</h3>
        <p className="text-secondary mb-4 font-normal">Hygiene equipments</p>
        <div className="flex gap-2">
          {['04', '13', '34', '56'].map((time, i) => (
            <div key={i} className="w-12 h-12 bg-[#606060] rounded flex flex-col items-center justify-center text-white">
              <span className="text-sm font-bold">{time}</span>
              <span className="text-[10px] opacity-70">
                {i === 0 ? 'Days' : i === 1 ? 'Hour' : i === 2 ? 'Min' : 'Sec'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Deals Grid */}
      <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 h-full">
        {isLoading && (
          <div className="col-span-full p-6 text-sm text-[#505050]">
            Loading products...
          </div>
        )}

        {loadError && !isLoading && (
          <div className="col-span-full p-6 text-sm text-[#D4380D]">
            {loadError}
          </div>
        )}

        {!isLoading && !loadError && products.map((product) => (
          <div
            key={product.id}
            className="p-6 flex flex-col items-center justify-center text-center border-r border-b lg:border-b-0 last:border-r-0 border-[#DEE2E7] cursor-pointer hover:shadow-[0px_8px_20px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 group"
            onClick={() => {
              if (!product.id) {
                return;
              }
              if (setPage) {
                setPage('details', { id: product.id });
                return;
              }
              navigate(`/products/${product.id}`);
            }}
          >
            <div className="w-full aspect-square bg-[#F7F7F7] rounded-md flex items-center justify-center mb-4 overflow-hidden p-2">
              <img src={product.image} alt={product.name} className="max-w-[90%] max-h-[90%] object-contain group-hover:scale-110 transition-transform duration-300" />
            </div>
            <p className="text-[#1C1C1C] text-sm mb-2">{product.name}</p>
            <span className="bg-[#E5F1FF] text-[#0D6EFD] px-3 py-1 rounded-full text-xs font-bold">
              ${product.price}
            </span>
          </div>
        ))}

        {!isLoading && !loadError && products.length === 0 && (
          <div className="col-span-full p-6 text-sm text-[#505050]">
            No products available.
          </div>
        )}
      </div>
    </section>
  );
};

export default Deals;

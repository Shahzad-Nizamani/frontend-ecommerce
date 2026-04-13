import React, { useEffect, useState } from 'react';
import { buildApiUrl, PRODUCT_DETAILS_BASE_URL } from '../config/api';

const RECOMMENDED_PRODUCTS_URL = buildApiUrl('/recommended_products');

const RecommendedItems = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const loadRecommended = async () => {
      setIsLoading(true);
      setLoadError('');

      try {
        const response = await fetch(RECOMMENDED_PRODUCTS_URL, {
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
            price: Number(item.price) || 0,
            desc: String(item.name || item.desc || 'Unnamed product').trim(),
            image: String(item.image || '').trim(),
          }))
          .filter((item) => item.desc);

        if (isMounted) {
          setItems(normalized);
        }
      } catch {
        if (isMounted) {
          setItems([]);
          setLoadError('Unable to load recommended products from /api/recommended_products');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadRecommended();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <section className="mt-8">
      <h3 className="text-2xl font-bold mb-6">Recommended items</h3>

      {isLoading && (
        <div className="bg-white border border-[#DEE2E7] rounded-lg p-4 mb-4 text-sm text-[#505050]">
          Loading recommended products...
        </div>
      )}

      {loadError && !isLoading && (
        <div className="bg-white border border-[#DEE2E7] rounded-lg p-4 mb-4 text-sm text-[#D4380D]">
          {loadError}
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
        {items.map((item, index) => (
          <div
            key={item.id ?? index}
            className="bg-white border border-[#DEE2E7] rounded-lg p-4 flex flex-col hover:shadow-[0px_10px_25px_rgba(0,0,0,0.1)] hover:-translate-y-2 transition-all duration-300 cursor-pointer group h-full"
            onClick={() => {
              if (!item.id) {
                return;
              }
              window.location.href = `${PRODUCT_DETAILS_BASE_URL}/${item.id}`;
            }}
          >
            <div className="flex-1 flex items-center justify-center p-4 mb-3">
              <img src={item.image} alt={item.desc} className="max-h-[140px] w-auto object-contain group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="mt-auto">
              <p className="text-[#8B96A5] text-[15px] overflow-hidden text-ellipsis line-clamp-2 leading-snug mb-1">{item.desc}</p>
              <p className="font-medium text-[#1C1C1C] text-lg">${item.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      {!isLoading && !loadError && items.length === 0 && (
        <div className="bg-white border border-[#DEE2E7] rounded-lg p-4 mt-4 text-sm text-[#505050]">
          No recommended products available.
        </div>
      )}
    </section>
  );
};

export default RecommendedItems;

import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Deals from './components/Deals';
import CategorySection from './components/CategorySection';
import InquiryForm from './components/InquiryForm';
import RecommendedItems from './components/RecommendedItems';
import Services from './components/Services';
import RegionSuppliers from './components/RegionSuppliers';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import ProductListing from './components/ProductListing';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import Profile from './components/Profile';
import Messages from './components/Messages';
import Orders from './components/Orders';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AddProductPage from './pages/AddProductPage';
import { buildApiUrl } from './config/api';

// Category Banner Images
import homeBanner from './assets/Image/backgrounds/image 98.png';
import electronicsBanner from './assets/Image/backgrounds/image 106.png';

// Home and Outdoor Images
import itemH1 from './assets/Image/interior/1.png';
import itemH2 from './assets/Image/interior/3.png';
import itemH3 from './assets/Image/interior/6.png';
import itemH4 from './assets/Image/interior/7.png';

// Electronics Images
import itemE1 from './assets/Image/tech/8.png';
import itemE2 from './assets/Image/tech/image 85.png';
import itemE3 from './assets/Image/tech/image 32.png';
import itemE4 from './assets/Image/tech/image 33.png';

const HomePage = ({ setPage }) => {
  const fallbackHomeAndOutdoorItems = [
    { name: 'Soft chairs', price: '19', image: itemH1 },
    { name: 'Sofa & chair', price: '19', image: itemH2 },
    { name: 'Kitchen dishes', price: '19', image: itemH3 },
    { name: 'Smart watches', price: '19', image: itemH4 },
  ];

  const fallbackTechItems = [
    { name: 'Smart watches', price: '19', image: itemE1 },
    { name: 'Cameras', price: '89', image: itemE2 },
    { name: 'Headphones', price: '10', image: itemE3 },
    { name: 'Smartphones', price: '19', image: itemE4 },
  ];

  const [homeAndOutdoorItems, setHomeAndOutdoorItems] = useState(fallbackHomeAndOutdoorItems);
  const [techItems, setTechItems] = useState(fallbackTechItems);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const normalizeProducts = (products, fallback) => {
      if (!Array.isArray(products)) {
        return fallback;
      }

      const normalized = products
        .map((item, index) => ({
          id: item.id ?? null,
          name: String(item.name || `Product ${index + 1}`).trim(),
          price: Number(item.price) || 0,
          image: String(item.image || '').trim(),
        }))
        .filter((item) => item.name)
        .slice(0, 4);

      return normalized.length ? normalized : fallback;
    };

    const loadProductsByType = async (type, setter, fallback) => {
      try {
        const response = await fetch(buildApiUrl(`/products_by_type/${type}`), {
          signal: controller.signal,
          headers: {
            Accept: 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }

        const json = await response.json();
        if (isMounted) {
          setter(normalizeProducts(json, fallback));
        }
      } catch {
        if (isMounted) {
          setter(fallback);
        }
      }
    };

    loadProductsByType('home_outdoor', setHomeAndOutdoorItems, fallbackHomeAndOutdoorItems);
    loadProductsByType('tech', setTechItems, fallbackTechItems);

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <div className="container">
      <Hero setPage={setPage} />
      <Deals setPage={setPage} />

      <CategorySection
        title="Home & outdoor"
        bannerBg="#FFE6BF"
        bannerImg={homeBanner}
        items={homeAndOutdoorItems}
        onItemClick={(item) => {
          if (!item?.id) {
            return;
          }
          setPage('details', { id: item.id });
        }}
      />

      <CategorySection
        title="Tech"
        bannerBg="#E5F1FF"
        bannerImg={electronicsBanner}
        items={techItems}
        onItemClick={(item) => {
          if (!item?.id) {
            return;
          }
          setPage('details', { id: item.id });
        }}
      />

      <div className="mt-4 flex justify-center">
        <a
          href="/product_listing"
          className="inline-flex items-center rounded-md bg-primary px-5 py-2.5 text-white text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          View all products
        </a>
      </div>

      <InquiryForm />
      <RecommendedItems setPage={setPage} />
      <Services />
      <RegionSuppliers />
    </div>
  );
};

const AppLayout = () => {
  const navigate = useNavigate();

  const setPage = (page, payload) => {
    switch (page) {
      case 'home':
        navigate('/');
        break;
      case 'listing': {
        const q = payload?.q?.trim();
        window.location.assign(q ? `/product_listing?q=${encodeURIComponent(q)}` : '/product_listing');
        break;
      }
      case 'details':
        window.location.assign(`/product_listing/${payload?.id || payload || 1}`);
        break;
      case 'cart':
        navigate('/cart');
        break;
      case 'profile':
        navigate('/profile');
        break;
      case 'message':
        navigate('/messages');
        break;
      case 'orders':
        navigate('/orders');
        break;
      case 'login':
        navigate('/login');
        break;
      case 'signup':
        navigate('/signup');
        break;
      case 'add-product':
        navigate('/add-product');
        break;
      default:
        navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header setPage={setPage} />

      <main className="flex-grow pb-12">
        <Routes>
          <Route path="/" element={<HomePage setPage={setPage} />} />
          <Route path="/product_listing" element={<ProductListing setPage={setPage} />} />
          <Route path="/product_listing/:id" element={<ProductDetails setPage={setPage} />} />
          <Route path="/cart" element={<Cart setPage={setPage} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/add-product" element={<AddProductPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Newsletter />
      <Footer />
    </div>
  );
};

function App() {
  return <AppLayout />;
}

export default App;


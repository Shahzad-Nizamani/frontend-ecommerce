import phone1 from '../assets/Image/tech/image 33.png';
import phone2 from '../assets/Image/tech/image 34.png';
import laptop from '../assets/Image/tech/image 23.png';
import watch from '../assets/Image/tech/8.png';
import camera from '../assets/Image/tech/image 29.png';
import canon from '../assets/Image/tech/image 85.png';
import headset from '../assets/Image/tech/image 32.png';
import kettle from '../assets/Image/tech/6.png';

const images = [phone1, phone2, laptop, watch, camera, canon, headset, kettle];
const categories = ['electronics', 'accessories', 'wearables', 'camera'];

export const products = Array.from({ length: 20 }).map((_, index) => {
  const id = index + 1;
  const image = images[index % images.length];
  const category = categories[index % categories.length];

  return {
    id,
    name: `Product ${id} ${category}`,
    price: Number((39 + id * 3.25).toFixed(2)),
    oldPrice: id % 2 === 0 ? Number((49 + id * 4.1).toFixed(2)) : null,
    category,
    image,
    description: `High quality ${category} item with modern design and durable build. Model ${id} is suitable for daily use and business needs.`,
    stock: 8 + id,
    rating: Number((3.8 + (id % 5) * 0.2).toFixed(1)),
    orders: 40 + id * 7,
    shipping: 'Free Shipping',
  };
});

export const featuredProducts = products.slice(0, 8);

export const getProductById = (id) => products.find((item) => item.id === Number(id));

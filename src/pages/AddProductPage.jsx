import React, { useEffect } from 'react';

const AddProductPage = () => {
  useEffect(() => {
    window.location.href = 'http://157.230.254.81:8001/admin/add-product';
  }, []);

  return null;
};

export default AddProductPage;

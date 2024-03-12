import React from 'react';

// Dummy data for products, replace with your actual data source
const products = [
  {
    id: 1,
    name: 'Xoài tú quý đào vàng',
    price: '55,000₫',
    image: '/path-to-xoai-image.jpg',
    discount: null,
  },
  // ... add other products
];

const ProductCard = ({ product }) => {
  return (
    <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden">
      <img className="w-full" src={product.image} alt={product.name} />
      <div className="px-5 py-3">
        <h3 className="text-gray-700 uppercase">{product.name}</h3>
        <span className="text-gray-500 mt-2">{product.price}</span>
        <div className="flex items-center justify-between mt-3">
          <button className="px-3 py-1 bg-orange-500 text-white text-xs font-bold uppercase rounded">
            Chọn mua
          </button>
          {product.discount && (
            <span className="text-sm text-red-500 font-semibold">
              -{product.discount}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const ProductGrid = () => {
  return (
    <div className="bg-orange-100 p-4">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
        Trái cây Việt Nam
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="text-center mt-8">
        <button className="px-4 py-2 bg-orange-500 text-white text-lg font-bold uppercase rounded-full">
          Xem thêm sản phẩm trái cây việt nam
        </button>
      </div>
    </div>
  );
};

export default ProductGrid;

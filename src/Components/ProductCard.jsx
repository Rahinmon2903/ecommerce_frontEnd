import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const imageUrl =
    product.images && product.images.length > 0
      ? product.images[0]
      : "https://via.placeholder.com/500x500?text=No+Image";

  return (
    <div className="bg-white rounded-xl overflow-hidden border hover:shadow-md transition">
      {/* Image */}
      <Link to={`/products/${product._id}`}>
        <div className="relative w-full aspect-square bg-gray-50">
          <img
            src={imageUrl}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-contain p-6"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="px-4 py-4">
        {/* Rating */}
        <div className="flex items-center gap-1 text-yellow-500 text-xs mb-1">
          ★ ★ ★ ★ ★
          <span className="ml-1 text-gray-400">4.8</span>
        </div>

        {/* Name */}
        <h3 className="text-sm font-medium text-gray-900 leading-snug line-clamp-2">
          {product.name}
        </h3>

        {/* Price */}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-base font-semibold text-gray-900">
            ₹ {product.price}
          </span>

         
        </div>
      </div>
    </div>
  );
};

export default ProductCard;




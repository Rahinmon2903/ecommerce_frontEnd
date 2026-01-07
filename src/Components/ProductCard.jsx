import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const imageUrl =
    product.images?.[0] ||
    "https://via.placeholder.com/500x500?text=No+Image";

  return (
    <Link to={`/products/${product._id}`}>
      <div className="group relative bg-white rounded-3xl
                      transition-all duration-300
                      hover:-translate-y-1 hover:shadow-2xl">

        {/* Image */}
        <div className="relative aspect-square bg-[#FAFAFA] rounded-t-3xl">
          <img
            src={imageUrl}
            alt={product.name}
            className="absolute inset-0 w-full h-full
                       object-contain p-8
                       transition-transform duration-300
                       group-hover:scale-110"
          />
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-sm font-medium text-gray-900
                         leading-snug line-clamp-2">
            {product.name}
          </h3>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-lg font-semibold text-gray-900">
              ₹ {product.price}
            </span>

            <span className="text-xs uppercase tracking-wide
                             text-gray-400 group-hover:text-black transition">
              View →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;


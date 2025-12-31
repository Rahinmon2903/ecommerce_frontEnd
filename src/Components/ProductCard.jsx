import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded p-4 shadow hover:shadow-lg">
      <h3 className="font-bold text-lg">{product.name}</h3>
      <p className="text-gray-600 mt-1">₹ {product.price}</p>
      <p className="text-sm text-gray-500">
        Seller: {product.seller?.name}
      </p>

      <Link
        to={`/products/${product._id}`}
        className="inline-block mt-3 text-blue-600"
      >
        View Details
      </Link>
    </div>
  );
};

export default ProductCard;

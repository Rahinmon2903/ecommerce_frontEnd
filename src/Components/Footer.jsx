import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
        
        {/* Left */}
        <p className="order-2 md:order-1">
          © {new Date().getFullYear()} Dream It. Own It
        </p>

        {/* Right */}
        <nav className="order-1 md:order-2 flex items-center gap-5">
          <Link
            to="/"
            className="hover:text-black transition-colors"
          >
            Home
          </Link>

          <Link
            to="/products"
            className="hover:text-black transition-colors"
          >
            Products
          </Link>

          <Link
            to="/cart"
            className="hover:text-black transition-colors"
          >
            Cart
          </Link>

          <Link
            to="/login"
            className="hover:text-black transition-colors"
          >
            Sign in
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;


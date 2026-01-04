import { Link } from "react-router-dom";
import Logo from "./Logo";

const Navbar = () => {
  return (
    <header className="bg-white">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" aria-label="Home" className="flex items-center">
          <Logo size={90} />
        </Link>

        {/* Actions */}
        <nav className="flex items-center gap-8 text-sm">
          <Link
            to="/login"
            className="text-gray-600 hover:text-black transition"
          >
            Sign in
          </Link>

          <Link
            to="/register"
            className="text-black font-medium hover:opacity-70 transition"
          >
            Create account
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;


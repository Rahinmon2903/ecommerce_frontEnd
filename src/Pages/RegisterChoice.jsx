import { Link } from "react-router-dom";
import Logo from "../Components/Logo";

const RegisterChoice = () => {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center px-6">
      <div className="w-full max-w-lg text-center">
        <Logo size={80} className="mx-auto mb-10" />

        <h1 className="text-2xl font-medium">
          Join Dream It. Own It
        </h1>

        <p className="text-sm text-gray-500 mt-2">
          Choose how you want to use the platform
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link
            to="/register-buyer"
            className="border rounded-xl p-6 hover:bg-gray-50 transition"
          >
            <h3 className="font-medium">
              I want to buy
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              Shop products and place orders
            </p>
          </Link>

          <Link
            to="/register-seller"
            className="border rounded-xl p-6 hover:bg-gray-50 transition"
          >
            <h3 className="font-medium">
              I want to sell
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              Create a store and sell products
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterChoice;

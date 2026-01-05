import { Link } from "react-router-dom";

const RegisterChoice = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="w-full max-w-sm text-center">
        <h1 className="text-xl font-medium">
          Select account type
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          You can change this later
        </p>

        <div className="mt-10 space-y-4">
          <Link
            to="/register-buyer"
            className="block w-full py-3 border text-sm hover:bg-gray-50 transition"
          >
            Buyer account
          </Link>

          <Link
            to="/register-seller"
            className="block w-full py-3 border text-sm hover:bg-gray-50 transition"
          >
            Seller account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterChoice;


import { Link } from "react-router-dom";

const RegisterChoice = () => {
  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center px-6">
      <div className="w-full max-w-sm bg-white rounded-2xl border
                      shadow-[0_8px_30px_rgba(0,0,0,0.04)]
                      p-8 text-center">

        {/* Heading */}
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
          Choose your account
        </h1>

        <p className="mt-2 text-sm text-gray-500 leading-relaxed">
          Select how you want to use Dream·It·Own·It
        </p>

        {/* Actions */}
        <div className="mt-10 space-y-4">
          <Link
            to="/register-buyer"
            className="block w-full py-3.5 rounded-lg border
                       text-sm font-medium text-gray-800
                       hover:bg-gray-50 hover:border-gray-300
                       active:scale-[0.99]
                       transition focus:outline-none
                       focus:ring-2 focus:ring-black/10"
          >
            🛒 Buyer account
          </Link>

          <Link
            to="/register-seller"
            className="block w-full py-3.5 rounded-lg
                       bg-black text-white text-sm font-medium
                       hover:opacity-90 active:scale-[0.99]
                       transition focus:outline-none
                       focus:ring-2 focus:ring-black/20"
          >
            🏪 Seller account
          </Link>
        </div>

        {/* Footer hint */}
        <p className="mt-8 text-xs text-gray-400">
          You can change this later from your account settings
        </p>
      </div>
    </div>
  );
};

export default RegisterChoice;

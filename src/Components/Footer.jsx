const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-14">

        {/* TOP */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* BRAND */}
          <div>
            <h3 className="text-lg font-semibold tracking-tight text-gray-900">
              Dream<span className="text-gray-400">It</span>
              <span className="mx-1 text-gray-300">·</span>
              Own<span className="text-gray-400">It</span>
            </h3>

            <p className="mt-4 text-sm text-gray-500 leading-relaxed max-w-sm">
              A modern marketplace connecting verified sellers with
              confident buyers — built for trust, clarity, and quality.
            </p>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4 tracking-wide">
              Contact
            </h4>

            <div className="space-y-2 text-sm">
              <p className="text-gray-500">
                Support:{" "}
                <a
                  href="mailto:support@dreamitownit.com"
                  className="text-gray-700 hover:text-black transition"
                >
                  support@dreamitownit.com
                </a>
              </p>

              <p className="text-gray-500">
                Business:{" "}
                <a
                  href="mailto:business@dreamitownit.com"
                  className="text-gray-700 hover:text-black transition"
                >
                  business@dreamitownit.com
                </a>
              </p>
            </div>
          </div>

          {/* LEGAL */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4 tracking-wide">
              Company
            </h4>

            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Dream It. Own It
            </p>

            <p className="mt-2 text-xs text-gray-400">
              All rights reserved.
            </p>
          </div>
        </div>

        {/* BOTTOM LINE */}
        <div className="mt-12 pt-6 border-t border-gray-100
                        flex flex-col sm:flex-row items-center
                        justify-between gap-4 text-xs text-gray-400">
          <p>
            Designed for clarity · Built for scale
          </p>

          <p>
            Made with care for modern commerce
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

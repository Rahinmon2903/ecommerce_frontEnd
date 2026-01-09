import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const PageLoader = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 350); // smooth & fast

    return () => clearTimeout(timer);
  }, [location.pathname]); // triggers on every route change

  if (!loading) return null;

  return (
    <div
      className="fixed inset-0 z-[9999]
                 bg-white/60 backdrop-blur-sm
                 flex items-center justify-center"
    >
      <div
        className="h-10 w-10 rounded-full
                   border-2 border-black
                   border-t-transparent
                   animate-spin"
      />
    </div>
  );
};

export default PageLoader;


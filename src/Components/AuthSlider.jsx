import { useEffect, useState } from "react";

const slides = [
  "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1510552776732-03e61cf4b144?auto=format&fit=crop&w=1200&q=80",
];

const AuthSlider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      3000
    );
    return () => clearInterval(t);
  }, []);

  return (
    <div className="w-1/2 h-screen relative overflow-hidden">
      {slides.map((img, i) => (
        <img
          key={i}
          src={img}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
};

export default AuthSlider;

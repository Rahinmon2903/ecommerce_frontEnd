import { useEffect, useState } from "react";

const slides = [
  "https://www.boat-lifestyle.com/cdn/shop/articles/The-Gadgets-You-Need-And-Want.jpg?v=1629901322",

  "https://www.kapoorwatch.com/blogs/wp-content/uploads/Banner1470x680-6.webp",
  "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/6b88cd96-20c5-43c1-8645-38d1aaac0946/PEGASUS+EASYON.png",
  "https://static.vecteezy.com/system/resources/thumbnails/010/994/232/small/nike-logo-black-clothes-design-icon-abstract-football-illustration-with-white-background-free-vector.jpg",
];

const AuthSlider = () => {
  const [index, setIndex] = useState(0);
  //open README.md
// add one empty line or comment

  useEffect(() => {
    const t = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      3500
    );
    return () => clearInterval(t);
  }, []);

  return (
    <div className="w-1/2 h-screen relative overflow-hidden bg-[#F5F5F5]">
      {slides.map((img, i) => (
        <img
          key={i}
          src={img}
          alt=""
          className={`absolute inset-0 w-full h-full
            object-contain p-16
            transition-opacity duration-700 ease-in-out
            ${i === index ? "opacity-100" : "opacity-0"}`}
        />
      ))}
    </div>
  );
};

export default AuthSlider;

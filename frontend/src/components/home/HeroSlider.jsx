import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const slides = [
  {
    title: "Spring Essentials",
    subtitle: "Fresh fits for your everyday wardrobe",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=80"
  },
  {
    title: "Streetwear Drop",
    subtitle: "New hoodies and oversized tees now live",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1400&q=80"
  },
  {
    title: "Outerwear Season",
    subtitle: "Jackets built for style and comfort",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=80"
  }
];

const HeroSlider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-200/70 shadow-soft dark:border-slate-700/70">
      <img
        key={slides[index].image}
        src={slides[index].image}
        alt={slides[index].title}
        className="h-[420px] w-full animate-[fadeUp_420ms_ease] object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/45 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
      <div className="absolute inset-0 flex items-center">
        <div className="px-8 text-white md:px-14">
          <p className="mb-3 inline-flex rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]">
            New Season
          </p>
          <h1 className="text-3xl font-black md:text-6xl">{slides[index].title}</h1>
          <p className="mt-3 max-w-lg text-sm md:text-lg">{slides[index].subtitle}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/products" className="rounded-xl bg-white px-5 py-2.5 font-semibold text-slate-900">
              Shop Now
            </Link>
            <Link to="/products?bestSeller=true" className="rounded-xl border border-white/40 bg-white/10 px-5 py-2.5 font-semibold">
              Explore Best Sellers
            </Link>
          </div>
        </div>
      </div>
      <article className="absolute bottom-5 right-5 hidden rounded-2xl border border-white/25 bg-white/10 px-4 py-3 text-white backdrop-blur-md md:block">
        <p className="text-xs uppercase tracking-[0.12em] text-white/75">Today Highlight</p>
        <p className="mt-1 text-lg font-bold">Fresh Arrivals Weekly</p>
      </article>
      <div className="absolute bottom-5 left-8 flex items-center gap-2">
        {slides.map((slide, idx) => (
          <button
            key={slide.title}
            type="button"
            onClick={() => setIndex(idx)}
            className={`h-2.5 rounded-full transition-all ${
              idx === index ? "w-8 bg-white" : "w-2.5 bg-white/45"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import HeroSlider from "../components/home/HeroSlider";
import CategoryQuickLinks from "../components/home/CategoryQuickLinks";
import PromoBanner from "../components/home/PromoBanner";
import TrustBar from "../components/home/TrustBar";
import ProductCard from "../components/common/ProductCard";
import AnimatedSection from "../components/common/AnimatedSection";
import SkeletonCard from "../components/common/SkeletonCard";
import api from "../utils/api";

const HomePage = () => {
  const [featured, setFeatured] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [featuredRes, bestRes] = await Promise.all([
          api.get("/products?limit=8"),
          api.get("/products?bestSeller=true&limit=8")
        ]);
        setFeatured(Array.isArray(featuredRes?.data?.products) ? featuredRes.data.products : []);
        setBestSellers(Array.isArray(bestRes?.data?.products) ? bestRes.data.products : []);
      } catch {
        setFeatured([]);
        setBestSellers([]);
        toast.error("Unable to load products. Check API URL and backend status.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="space-y-12">
      <AnimatedSection>
        <HeroSlider />
      </AnimatedSection>
      <AnimatedSection>
        <TrustBar />
      </AnimatedSection>
      <AnimatedSection>
        <CategoryQuickLinks />
      </AnimatedSection>
      <AnimatedSection className="relative">
        <div className="pointer-events-none absolute -left-20 -top-20 h-52 w-52 rounded-full bg-cyan-500/5 blur-3xl" />
        <h2 className="mb-4 text-2xl font-black tracking-tight text-slate-900 dark:text-slate-100">Featured Products</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {loading
            ? Array.from({ length: 8 }).map((_, idx) => <SkeletonCard key={idx} />)
            : featured.map((product) => <ProductCard key={product._id} product={product} />)}
        </div>
      </AnimatedSection>
      <AnimatedSection>
        <PromoBanner />
      </AnimatedSection>
      <AnimatedSection className="relative">
        <div className="pointer-events-none absolute -right-16 top-10 h-52 w-52 rounded-full bg-sky-500/5 blur-3xl" />
        <h2 className="mb-4 text-2xl font-black tracking-tight text-slate-900 dark:text-slate-100">Best Sellers</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {loading
            ? Array.from({ length: 8 }).map((_, idx) => <SkeletonCard key={idx} />)
            : bestSellers.map((product) => <ProductCard key={product._id} product={product} />)}
        </div>
      </AnimatedSection>
    </div>
  );
};

export default HomePage;

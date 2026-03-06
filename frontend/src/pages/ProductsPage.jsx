import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import ProductCard from "../components/common/ProductCard";
import Pagination from "../components/common/Pagination";
import SkeletonCard from "../components/common/SkeletonCard";
import ProductFilters from "../components/products/ProductFilters";
import useDebounce from "../hooks/useDebounce";
import api from "../utils/api";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const [searchText, setSearchText] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: searchParams.get("category") || "",
    sort: "",
    bestSeller: searchParams.get("bestSeller") === "true",
    inStock: false,
    page: 1
  });
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const debouncedSearch = useDebounce(searchText, 450);

  const queryString = useMemo(() => {
    const params = new URLSearchParams();
    params.set("page", filters.page);
    params.set("limit", 9);
    if (debouncedSearch) params.set("search", debouncedSearch);
    if (filters.category) params.set("category", filters.category);
    if (filters.sort) params.set("sort", filters.sort);
    if (filters.bestSeller) params.set("bestSeller", "true");
    if (filters.inStock) params.set("inStock", "true");
    return params.toString();
  }, [debouncedSearch, filters]);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/products?${queryString}`);
        setProducts(Array.isArray(data?.products) ? data.products : []);
        setTotalPages(Number.isFinite(data?.totalPages) ? data.totalPages : 1);
      } catch {
        setProducts([]);
        setTotalPages(1);
        toast.error("Unable to load products.");
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [queryString]);

  return (
    <div className="grid gap-6 md:grid-cols-[260px_1fr]">
      <ProductFilters
        filters={filters}
        setFilters={setFilters}
        showMobile={showMobileFilters}
        setShowMobile={setShowMobileFilters}
      />
      <section>
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold">All Products</h1>
          <input
            type="text"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              setFilters((prev) => ({ ...prev, page: 1 }));
            }}
            placeholder="Search products..."
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2 sm:max-w-xs dark:border-slate-700 dark:bg-slate-900"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 9 }).map((_, idx) => <SkeletonCard key={idx} />)
            : products.map((product) => <ProductCard key={product._id} product={product} />)}
        </div>
        {!loading && products.length === 0 && (
          <p className="mt-6 text-center text-slate-500">No products found for selected filters.</p>
        )}
        <Pagination
          page={filters.page}
          totalPages={totalPages}
          onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))}
        />
      </section>
    </div>
  );
};

export default ProductsPage;

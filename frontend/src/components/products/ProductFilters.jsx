const ProductFilters = ({ filters, setFilters, showMobile, setShowMobile }) => {
  const categories = ["", "T-Shirts", "Hoodies", "Pants", "Shirts", "Jackets"];

  return (
    <>
      <button
        type="button"
        className="mb-4 rounded-xl border border-slate-300 px-3 py-2 md:hidden"
        onClick={() => setShowMobile(!showMobile)}
      >
        {showMobile ? "Hide Filters" : "Show Filters"}
      </button>

      <aside className={`${showMobile ? "block" : "hidden"} card md:block`}>
        <h3 className="text-lg font-semibold">Filters</h3>

        <label className="mt-4 block text-sm font-medium">Category</label>
        <select
          value={filters.category}
          onChange={(e) => setFilters((prev) => ({ ...prev, category: e.target.value, page: 1 }))}
          className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
        >
          {categories.map((category) => (
            <option key={category || "all"} value={category}>
              {category || "All"}
            </option>
          ))}
        </select>

        <label className="mt-4 block text-sm font-medium">Sort by Price</label>
        <select
          value={filters.sort}
          onChange={(e) => setFilters((prev) => ({ ...prev, sort: e.target.value, page: 1 }))}
          className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
        >
          <option value="">Newest</option>
          <option value="price-asc">Low to High</option>
          <option value="price-desc">High to Low</option>
        </select>

        <label className="mt-4 flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={filters.bestSeller}
            onChange={(e) => setFilters((prev) => ({ ...prev, bestSeller: e.target.checked, page: 1 }))}
          />
          Best Sellers
        </label>

        <label className="mt-2 flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={filters.inStock}
            onChange={(e) => setFilters((prev) => ({ ...prev, inStock: e.target.checked, page: 1 }))}
          />
          In Stock Only
        </label>
      </aside>
    </>
  );
};

export default ProductFilters;

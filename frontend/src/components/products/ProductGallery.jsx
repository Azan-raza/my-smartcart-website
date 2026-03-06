import { getDefaultProductImageUrl } from "../../utils/productImage";

const ProductGallery = ({ images, selected, onSelect }) => {
  const activeIndex = images.length ? Math.min(selected, images.length - 1) : 0;
  const mainImage = images.length ? images[activeIndex] : "";

  return (
    <div>
      <img
        src={mainImage}
        alt="Product"
        onError={(e) => {
          e.currentTarget.src = getDefaultProductImageUrl();
        }}
        className="h-[420px] w-full rounded-2xl object-cover"
      />
      <div className="mt-3 grid grid-cols-3 gap-2">
        {images.map((image, idx) => (
          <button
            type="button"
            key={image}
            onClick={() => onSelect(idx)}
            className={`overflow-hidden rounded-xl border ${
              selected === idx ? "border-slate-900 dark:border-sky-400" : "border-slate-200 dark:border-slate-700"
            }`}
          >
            <img
              src={image}
              alt={`Product ${idx + 1}`}
              onError={(e) => {
                e.currentTarget.src = getDefaultProductImageUrl();
              }}
              className="h-24 w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;

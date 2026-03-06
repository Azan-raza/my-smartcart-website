import { formatDate } from "../../utils/format";

const ProductReviews = ({ product }) => {
  return (
    <section className="card mt-8">
      <h3 className="text-xl font-semibold">Reviews ({product.numReviews})</h3>
      <div className="mt-4 space-y-4">
        {product.reviews?.length ? (
          product.reviews.map((review, idx) => (
            <div key={`${review.name}-${idx}`} className="rounded-xl border border-slate-200 p-3 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <p className="font-semibold">{review.name}</p>
                <p className="text-sm text-slate-500">{formatDate(review.date)}</p>
              </div>
              <p className="mt-1 text-sm">Rating: {review.rating}/5</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{review.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-500">No reviews yet.</p>
        )}
      </div>
    </section>
  );
};

export default ProductReviews;

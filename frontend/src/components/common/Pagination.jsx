const Pagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="mt-8 flex justify-center gap-2">
      {Array.from({ length: totalPages }).map((_, idx) => {
        const pageNumber = idx + 1;
        return (
          <button
            type="button"
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={`rounded-lg px-3 py-2 text-sm ${
              page === pageNumber
                ? "bg-slate-900 text-white dark:bg-sky-500"
                : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800"
            }`}
          >
            {pageNumber}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;

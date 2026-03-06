const SkeletonCard = () => {
  return (
    <div className="card animate-pulse">
      <div className="h-44 rounded-xl bg-slate-200 dark:bg-slate-800" />
      <div className="mt-3 h-4 w-3/4 rounded bg-slate-200 dark:bg-slate-800" />
      <div className="mt-2 h-4 w-1/2 rounded bg-slate-200 dark:bg-slate-800" />
    </div>
  );
};

export default SkeletonCard;

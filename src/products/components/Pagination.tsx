interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages: number[] = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center mt-6 gap-2">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 border rounded cursor-pointer ${
            page === currentPage ? "bg-slate-800 text-white" : "bg-slate-100"
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
}

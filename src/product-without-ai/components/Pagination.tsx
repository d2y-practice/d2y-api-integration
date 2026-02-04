interface PaginationInterface {
  currentPage: number;
  totalPage: number;
  onPageChange: (page: number) => void;
}
const Pagination = ({
  currentPage,
  totalPage,
  onPageChange,
}: PaginationInterface) => {
  const pages: number[] = [];

  for (let i = 1; i <= totalPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex gap-2 mt-8">
      {pages.map((page) => (
        <button
          className={`py-2 px-4 rounded-md cursor-pointer ${
            page == currentPage ? "bg-slate-800 text-white" : "bg-slate-200"
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;

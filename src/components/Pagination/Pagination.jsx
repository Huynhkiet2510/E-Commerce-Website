
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPages = () => {
    const pages = [];
    const delta = window.innerWidth < 640 ? 1 : 2;
    const left = Math.max(2, currentPage - delta);
    const right = Math.min(totalPages - 1, currentPage + delta);

    pages.push(1);
    if (left > 2) pages.push('...');
    for (let i = left; i <= right; i++) {
      pages.push(i);
    }
    if (right < totalPages - 1) pages.push('...');
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-2 my-8">

      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="
          h-10 px-4 rounded border
          bg-pagination-bg
          disabled:opacity-50 disabled:cursor-not-allowed
          hover:bg-gray-100
        "
      >
        Trước
      </button>

      <div className="flex items-center gap-1 md:gap-2">
        {getPages().map((p, index) =>
          p === '...' ? (
            <span key={index} className="px-1 md:px-2 text-text-muted">
              ...
            </span>
          ) : (
            <button
              key={index}
              onClick={() => onPageChange(p)}
              className={`w-10 h-10 rounded border ${p === currentPage
                ? 'bg-blue-500 text-white border-blue-500 border border-border-customer'
                : 'bg-pagination-bg hover:text-text-main hover:bg-page-bg'}
                }`}
            >
              {p}
            </button>
          )
        )}
      </div>


      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="
          h-10 px-4 rounded border
          bg-pagination-bg
          disabled:opacity-50 disabled:cursor-not-allowed
          hover:bg-gray-100
        "
      >
        Sau
      </button>
    </div>
  );
};

export default Pagination;


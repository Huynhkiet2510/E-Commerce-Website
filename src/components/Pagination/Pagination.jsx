const Pagination = ({ currentPage, totalPages, onPageChange }) => {
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

      {[...Array(totalPages)].map((_, i) => {
        const page = i + 1;
        const isActive = currentPage === page;

        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`
              w-10 h-10 rounded border
              ${isActive
                ? 'bg-blue-500 text-white border-blue-500 border border-border-customer'
                : 'bg-pagination-bg hover:bg-gray-100'}
            `}
          >
            {page}
          </button>
        );
      })}


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

import { useOutletContext } from "react-router-dom";
import CartProduct from "./CartProduct";

const ListProduct = ({ loading, setTempFilters, sortedItems, setInputSearch, setSearchParams }) => {
    const { setSearchTerm } = useOutletContext();

    const handleResetAll = () => {
        setInputSearch("");

        setTempFilters({
            minPrice: '',
            maxPrice: '',
            categoryId: null,
            sortBy: 'Mới nhất',

        });
        setSearchTerm("");
        setSearchParams({});

    };

    return (
        <div>{loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="h-80 bg-gray-300 animate-pulse rounded-2xl"></div>
                ))}
            </div>
        ) : (
            <>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedItems.length > 0 ? sortedItems.map((item) => (
                        <CartProduct key={item.id} item={item} />
                    )) : (
                        <div className="col-span-full text-center py-20 bg-card-bg rounded-3xl border-2 border-dashed border-border-customer">
                            <div className="text-gray-400 mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <p className="text-gray-500 font-medium">Không tìm thấy sản phẩm phù hợp.</p>
                            <button
                                onClick={handleResetAll}
                                className="mt-4 text-blue-600 font-bold hover:underline"
                            >
                                Xóa tất cả bộ lọc
                            </button>
                        </div>
                    )}
                </div>
            </>
        )}</div>
    )
}

export default ListProduct
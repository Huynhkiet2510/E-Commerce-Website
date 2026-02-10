import ListProduct from "./ListProduct"
import SortProduct from "./SortProduct";
import Pagination from "../../../components/Pagination/Pagination";
import Sidebar from "./FilterProduct";
import { useProductList } from "./useProductList";
import { useOutletContext } from "react-router-dom";
import BigError from "../../../components/StateErrror/BigError"
import { SlidersHorizontal } from "lucide-react";

const ListProductPage = () => {
    const { setInputSearch, searchTerm } = useOutletContext();
    const {
        loading, sortedItems, totalPages, currentPage, error,
        handlePageChange, fetchData, isFilterOpen, setIsFilterOpen,
        tempFilters, handleInputChange, handleApplyFilters,
        setTempFilters, categories, setSearchParams
    } = useProductList(false, null, searchTerm);

    if (error) return (
        <BigError title="Không tải được sản phẩm" onRetry={fetchData} />
    );

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">

            <div className="flex flex-col md:flex-row gap-8">

                <Sidebar
                    isOpen={isFilterOpen}
                    onClose={() => setIsFilterOpen(false)}
                    handleApplyFilters={handleApplyFilters}
                    tempFilters={tempFilters}
                    handleInputChange={handleInputChange}
                    setTempFilters={setTempFilters}
                    categories={categories}
                />

                <div className="flex-1">
                    <SortProduct
                        setTempFilters={setTempFilters}
                        tempFilters={tempFilters}
                    />

                    <div className="md:hidden mb-4 flex justify-end">
                        <button
                            onClick={() => setIsFilterOpen(true)}
                            className="flex items-center gap-2 bg-card-bg border border-gray-300 px-4 py-2 rounded-lg font-medium shadow-sm active:scale-95 transition"
                        >
                            <SlidersHorizontal size={20} />
                            <span>Bộ lọc</span>
                        </button>
                    </div>

                    <ListProduct
                        loading={loading}
                        setTempFilters={setTempFilters}
                        sortedItems={sortedItems}
                        setSearchParams={setSearchParams}
                        setInputSearch={setInputSearch}
                    />
                </div>
            </div>



            <div className="py-8">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default ListProductPage;
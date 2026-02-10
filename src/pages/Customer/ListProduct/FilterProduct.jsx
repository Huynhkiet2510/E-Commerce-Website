import { X } from "lucide-react";

const Sidebar = ({ isOpen, onClose, handleApplyFilters, tempFilters, handleInputChange, setTempFilters, categories }) => {

    const FilterFields = () => (
        <>
            <div className="mb-8">
                <h3 className="font-semibold mb-4">Khoảng giá ($)</h3>
                <div className="flex items-center gap-2">
                    <input
                        type="number"
                        name="minPrice"
                        placeholder="Từ"
                        value={tempFilters.minPrice}
                        onChange={handleInputChange}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-gray-400">—</span>
                    <input
                        type="number"
                        name="maxPrice"
                        value={tempFilters.maxPrice}
                        onChange={handleInputChange}
                        placeholder="Đến"
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            <div className="mb-8">
                <h3 className="font-semibold mb-4">Danh mục</h3>
                <div className="flex flex-col gap-3 text-sm">
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                            type="radio"
                            name="category-group"
                            checked={tempFilters.categoryId === null}
                            onChange={() => setTempFilters(p => ({ ...p, categoryId: null }))}
                            className="w-4 h-4 text-blue-600"
                        />
                        <span>Tất cả</span>
                    </label>
                    {categories.map((cat) => (
                        <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
                            <input
                                type="radio"
                                name="category-group"
                                checked={Number(tempFilters.categoryId) === cat.id}
                                onChange={() => setTempFilters(p => ({ ...p, categoryId: cat.id }))}
                                className="w-4 h-4 text-blue-600"
                            />
                            <span className="group-hover:text-blue-600 transition">{cat.name}</span>
                        </label>
                    ))}
                </div>
            </div>
        </>
    );

    return (
        <>
            <aside className="hidden md:block w-72 bg-sort-bg border border-border-customer h-fit p-6 top-24 rounded-lg">
                <h2 className="font-bold text-xl mb-6">Bộ lọc</h2>
                <FilterFields />
                <button
                    onClick={handleApplyFilters}
                    className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition"
                >
                    Áp dụng bộ lọc
                </button>
            </aside>

            <div className={`fixed inset-0 z-[100] md:hidden transition-all duration-300 ${isOpen ? "visible" : "invisible"}`}>
                <div
                    className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
                    onClick={onClose}
                />

                <div className={`absolute inset-x-0 bottom-0 bg-card-bg rounded-t-3xl p-6 transition-transform duration-300 transform ${isOpen ? "translate-y-0" : "translate-y-full"}`}>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="font-bold text-xl">Bộ lọc</h2>
                        <button onClick={onClose} className="p-2 rounded-full"><X size={20} /></button>
                    </div>

                    <div className="max-h-[60vh] overflow-y-auto">
                        <FilterFields />
                    </div>

                    <button
                        onClick={() => {
                            handleApplyFilters();
                            onClose();
                        }}
                        className="w-full bg-blue-600 text-white font-semibold py-4 rounded-2xl mt-4 shadow-lg"
                    >
                        Áp dụng ngay
                    </button>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
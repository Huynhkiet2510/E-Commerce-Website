
const Sidebar = ({handleApplyFilters, tempFilters, handleInputChange, setTempFilters, categories }) => {
   
    return (
        <aside className="hidden md:block w-72 bg-white border border-gray-100 rounded-2xl shadow-sm h-fit p-6  top-24">
            <h2 className="font-bold text-xl mb-6 text-gray-800">Bộ lọc</h2>

            <div className="mb-8">
                <h3 className="font-semibold mb-4 text-gray-700">Khoảng giá ($)</h3>
                <div className="flex items-center gap-2">
                    <input
                        type="number"
                        name="minPrice"
                        placeholder="Từ"
                        value={tempFilters.minPrice}
                        onChange={handleInputChange}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
                    />
                    <span className="text-gray-400">—</span>
                    <input
                        type="number"
                        name="maxPrice"
                        value={tempFilters.maxPrice}
                        onChange={handleInputChange}
                        placeholder="Đến"
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
                    />
                </div>
            </div>

            <div className="mb-8">
                <h3 className="font-semibold mb-4 text-gray-700">Danh mục</h3>
                <div className="flex flex-col gap-3 text-sm">
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                            type="radio"
                            name="category-group"
                            checked={tempFilters.categoryId === null}
                            onChange={() => setTempFilters(p => ({ ...p, categoryId: null }))}
                            className="w-4 h-4 text-blue-600 cursor-pointer"
                        />
                        <span className="text-gray-600">Tất cả</span>
                    </label>
                    {categories.map((cat) => (
                        <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
                            <input
                                type="radio"
                                name="category-group"
                                checked={Number(tempFilters.categoryId) === cat.id}                            
                                onChange={() => setTempFilters(p => ({ ...p, categoryId: cat.id }))}
                                className="w-4 h-4 text-blue-600 cursor-pointer"
                            />
                            <span className="text-gray-600 group-hover:text-blue-600 transition">{cat.name}</span>
                        </label>
                    ))}
                </div>
            </div>

            <button
                onClick={handleApplyFilters}
                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition-all active:scale-95"
            >
                Áp dụng bộ lọc
            </button>
        </aside>
    );
};

export default Sidebar;
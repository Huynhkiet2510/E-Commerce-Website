import React from "react"

const SortProduct = ({setTempFilters, tempFilters}) => {
    return (
        <div className="flex items-center justify-end mb-6 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-400 uppercase mr-2">Sắp xếp:</span>
                <button
                    onClick={() => setTempFilters(p => ({ ...p, sortBy: "Mới nhất" }))}
                    className={`p-2 rounded-lg transition-all ${tempFilters.sortBy === "Mới nhất" ? "bg-blue-100 text-blue-600" : "bg-gray-50 text-gray-400 hover:bg-gray-100"}`}
                    title="Mới nhất"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
                <button
                    onClick={() => setTempFilters(p => ({ ...p, sortBy: "Giá tăng dần" }))}
                    className={`p-2 rounded-lg transition-all ${tempFilters.sortBy === "Giá tăng dần" ? "bg-blue-100 text-blue-600" : "bg-gray-50 text-gray-400 hover:bg-gray-100"}`}
                    title="Giá tăng dần"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                    </svg>
                </button>
                <button
                    onClick={() => setTempFilters(p => ({ ...p, sortBy: "Giá giảm dần" }))}
                    className={`p-2 rounded-lg transition-all ${tempFilters.sortBy === "Giá giảm dần" ? "bg-blue-100 text-blue-600" : "bg-gray-50 text-gray-400 hover:bg-gray-100"}`}
                    title="Giá giảm dần"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default SortProduct
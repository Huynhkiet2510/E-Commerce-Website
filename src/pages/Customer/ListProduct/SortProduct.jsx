import { 
  Clock, 
  ArrowUpNarrowWide, 
  ArrowDownWideNarrow 
} from "lucide-react";

const SortProduct = ({ setTempFilters, tempFilters }) => {
    const sortOptions = [
        {
            id: "Mới nhất",
            icon: Clock, 
            title: "Mới nhất"
        },
        {
            id: "Giá tăng dần",
            icon: ArrowUpNarrowWide,
            title: "Giá thấp đến cao"
        },
        {
            id: "Giá giảm dần",
            icon: ArrowDownWideNarrow,
            title: "Giá cao đến thấp"
        }
    ];

    return (
        <div className="flex items-center justify-end mb-6 bg-card-bg p-3 rounded-2xl border border-border-customer transition-all duration-300">
            <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest mr-2 ml-1">
                    Sắp xếp
                </span>
                
                {sortOptions.map((option) => {
                    const Icon = option.icon; 
                    const isActive = tempFilters.sortBy === option.id;

                    return (
                        <button
                            key={option.id}
                            onClick={() => setTempFilters(p => ({ ...p, sortBy: option.id }))}
                            title={option.title}
                            className={`p-2 rounded-xl transition-all duration-300 active:scale-90 flex items-center justify-center ${
                                isActive
                                    ? "bg-text-main text-text-active shadow-lg shadow-black/5 dark:shadow-white/5"
                                    : "bg-transparent  hover:text-text-main hover:bg-page-bg"
                            }`}
                        >
                            <Icon size={18} strokeWidth={2.5} />
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default SortProduct;
import { Search } from 'lucide-react';

const SearchBar = ({ value, onChange, onSearch }) => {
    return (
        <div className="hidden lg:flex flex-grow max-w-lg mx-10">
            <div className="relative w-full">
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && onSearch()}
                    placeholder="Tìm kiếm sản phẩm..."
                    className="w-full py-2 pl-4 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button onClick={onSearch} className="absolute right-0 top-0 mt-2 mr-2 text-gray-500 hover:text-indigo-600">
                    <Search className="w-5 h-5" />
                </button>
            </div>
        </div>
    )
}

export default SearchBar;

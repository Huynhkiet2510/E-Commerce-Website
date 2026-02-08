import { useDispatch, useSelector } from 'react-redux';
import { FaSun, FaMoon } from "react-icons/fa";
import { toggleTheme } from "../../stores/themeSlice";

const ToggleTheme = () => {
    const mode = useSelector((state) => state.theme.mode);
    const dispatch = useDispatch();

    return (
        <button
            onClick={() => dispatch(toggleTheme())}
            className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors duration-500 outline-none focus:outline-none shadow-inner ${
                mode === 'light' ? 'bg-gray-300' : 'bg-slate-700'
            }`}
        >
            <div className="absolute flex w-full justify-between px-2 text-[10px] pointer-events-none">
                <FaMoon className={`${mode === 'light' ? 'text-gray-400' : 'opacity-0'} transition-opacity`} />
                <FaSun className={`${mode === 'dark' ? 'text-yellow-400/50' : 'opacity-0'} transition-opacity`} />
            </div>

            <div
                className={`absolute flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-lg transition-all duration-500 transform ${
                    mode === 'light' ? 'translate-x-1' : 'translate-x-9'
                }`}
            >
                {mode === 'light' ? (
                    <FaSun className="text-yellow-500 text-xs" />
                ) : (
                    <FaMoon className="text-blue-500 text-xs" />
                )}
            </div>
        </button>
    );
};

export default ToggleTheme;
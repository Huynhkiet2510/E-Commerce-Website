import { User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserMenu = ({ user, isMenuOpen, setIsMenuOpen , onLogout, menuRef }) => {
    const navigate  = useNavigate();
    
    return (
        <div ref={menuRef} className="relative">
            <div className="flex items-center cursor-pointer">
                {user ? (
                    <img
                        src={user.avatar}
                        alt="avatar"
                        className="w-8 h-8 rounded-full border"
                        onClick={() => setIsMenuOpen(prev => !prev)}
                    />
                ) : (
                    <button onClick={() => navigate("/login")} className="text-gray-700 hover:text-indigo-600 p-2">
                        <User className="w-6 h-6" />
                    </button>
                )}
            </div>

            {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-50">
                    <button
                        onClick={() => { navigate("/profile"); setIsMenuOpen(false); }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-t-lg text-sm"
                    >
                        Profile
                    </button>
                    <button
                        onClick={onLogout}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-b-lg text-sm text-red-500"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserMenu;
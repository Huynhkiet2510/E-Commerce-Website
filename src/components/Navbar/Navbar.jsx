import { ShoppingCart, Menu, X } from 'lucide-react';
import { useNavbarLogic } from './useNavbar';

import SearchBar from './SearchBar';
import NavLinks from './NavLinks';
import UserMenu from './UserMenu';
import CartSidebar from '../CartSidebar/CartSidebar';
import ToggleTheme from './ToggleTheme';

const Navbar = ({ inputSearch, setInputSearch, onSearch }) => {
  const { state, actions, refs, navLinks } = useNavbarLogic(setInputSearch);


  return (
    <header className="bg-navbar-bg shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div onClick={actions.handleLogoClick} className="flex-shrink-0 cursor-pointer">
            <div className="text-2xl font-bold text-indigo-600">E-Shop</div>
          </div>


          <SearchBar value={inputSearch} onChange={setInputSearch} onSearch={onSearch} />

          <NavLinks links={navLinks} className="hidden lg:flex lg:space-x-8 items-center" />

          <div className="flex items-center space-x-4">
            <ToggleTheme />

            <button onClick={() => actions.setIsCartOpen(true)} className="relative p-2 text-text-main cursor-pointer">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute top-2 right-2 px-2 py-1 text-xs font-bold text-white bg-red-600 rounded-full translate-x-1/2 -translate-y-1/2">
                {state.cartCount}
              </span>
            </button>

            <UserMenu
              user={state.user}
              isMenuOpen={state.isUserMenuOpen}
              setIsMenuOpen={actions.setIsUserMenuOpen}
              onLogout={actions.handleLogout}
              menuRef={refs.menuRef}
            />

            <button onClick={() => actions.setIsMenuOpen(!state.isMenuOpen)} className="lg:hidden p-2">
              {state.isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

      </nav>


      <CartSidebar isOpen={state.isCartOpen} onClose={() => actions.setIsCartOpen(false)} />

      {state.isMenuOpen && (
        <div className="lg:hidden bg-white border-t px-4 py-4 space-y-4 shadow-inner">
          <SearchBar inputSearch={inputSearch} setInputSearch={setInputSearch} onSearch={onSearch} />
          <NavLinks links={navLinks} className="space-y-4" onClickItem={() => actions.setIsMenuOpen(false)} />
        </div>
      )}

    </header>
  );
};

export default Navbar;
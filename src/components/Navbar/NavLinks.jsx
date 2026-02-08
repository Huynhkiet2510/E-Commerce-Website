import { Link } from 'react-router-dom';

const NavLinks = ({ links, className, onClickItem }) => {
  return (
    <div className={className}>
      {links.map((link) => (
        <Link
          key={link.title}
          to={link.url}
          onClick={onClickItem}
          className="hover:text-indigo-600 px-3 py-2 text-sm font-medium transition cursor-pointer block lg:inline-block"
        >
          {link.title}
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
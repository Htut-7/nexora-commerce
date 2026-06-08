import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiShoppingBag,
  FiUser,
  FiMenu,
  FiX
} from "react-icons/fi";
import "../css/Nav.css";
import useSignOut from "../Hooks/useSignOut";
import { useState, useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { CartContext } from "../Contexts/CartContext";

export default function Navbar() {

  const { logOut } = useSignOut();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);

  const { user } = useContext(AuthContext);
  const { cart } = useContext(CartContext);

  const handleSearch = (e) => {
    if (e.key === "Enter" && search.trim()) {
      navigate(
        `/products?search=${encodeURIComponent(search)}`
      );
      setMobileMenu(false);
    }
  };

  const logUserOut = async (e) => {
    e.preventDefault();

    await logOut();

    navigate("/login");
  };

  const closeMenu = () => {
    setMobileMenu(false);
  };

  return (
    <nav className="navbar">

      <div className="nav-logo">
        <Link to="/">NEXORA</Link>
      </div>

      <button
        className="mobile-menu-btn"
        onClick={() =>
          setMobileMenu(!mobileMenu)
        }
      >
        {mobileMenu ? <FiX /> : <FiMenu />}
      </button>

      <ul
        className={`nav-links ${
          mobileMenu ? "active" : ""
        }`}
      >

        <li>
          <NavLink
            to="/"
            onClick={closeMenu}
          >
            Home
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/women"
            onClick={closeMenu}
          >
            Women
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/men"
            onClick={closeMenu}
          >
            Men
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/kids"
            onClick={closeMenu}
          >
            Kids
          </NavLink>
        </li>

        <li className="dropdown">

          <span>Products</span>

          <ul className="dropdown-menu">

            <li>
              <NavLink
                to="/products"
                onClick={closeMenu}
              >
                All Products
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/newarrival"
                onClick={closeMenu}
              >
                New Arrivals
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/perfume"
                onClick={closeMenu}
              >
                Perfumes
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/shoes"
                onClick={closeMenu}
              >
                Shoes
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/accessories"
                onClick={closeMenu}
              >
                Accessories
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/premium"
                onClick={closeMenu}
              >
                Premium Picks
              </NavLink>
            </li>

          </ul>

        </li>

        <div className="mobile-search">

          <div className="search-box">

            <FiSearch />

            <input
              type="text"
              placeholder="Search Products..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              onKeyDown={handleSearch}
            />

          </div>

        </div>

      </ul>

      <div className="nav-actions">

        <div className="search-box desktop-search">

          <FiSearch />

          <input
            type="text"
            placeholder="Search Products..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            onKeyDown={handleSearch}
          />

        </div>

        <div className="profile-dropdown">

          <FiUser className="nav-icon" />

          <ul className="profile-menu">

            {!user && (
              <>
                <li>
                  <NavLink to="/login">
                    Login
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/register">
                    Register
                  </NavLink>
                </li>
              </>
            )}

            {!!user && (
              <li>

                <Link to="/profile">
                  Profile
                </Link>

                <button
                  type="button"
                  className="logout-btn"
                  onClick={logUserOut}
                >
                  Logout
                </button>

              </li>
            )}

          </ul>

        </div>

        <Link
          to="/cart"
          className="nav-icon cart-link"
        >

          <FiShoppingBag />

          {cart.length > 0 && (
            <span className="cart-badge">
              {cart.length}
            </span>
          )}

        </Link>

      </div>

    </nav>
  );
}
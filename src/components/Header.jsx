import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"

const Header = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
      const [menuOpen, setMenuOpen] = useState(false);


    return (
      <header className={`${pathname === "/show-data" ? "relative bg-[#161616]" : "absolute"} w-full z-30 py-6`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div onClick={() => navigate("/")} className="cursor-pointer">
            <span className="text-2xl text-white tracking-widest font-semibold">MovieDev</span>
          </div>

          <ul className="hidden md:flex gap-8 items-center">
            <li className="text-lg font-light text-white hover:text-[#E50916] transition">
              <Link to="/">Home</Link>
            </li>
            <li className="text-lg font-light text-white hover:text-[#E50916] transition">
              <Link to="/add-movie">Add Movie</Link>
            </li>
            <li className="text-lg font-light text-white hover:text-[#E50916] transition">
              <Link to="/show-data">Movie List</Link>
            </li>
          </ul>

          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white focus:outline-none"
              aria-label="Toggle Menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {menuOpen && (
          <ul className="md:hidden mt-4 flex flex-col gap-4 bg-[#161616] rounded-lg p-4 shadow-md">
            <li className="text-white hover:text-[#E50916] transition">
              <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
            </li>
            <li className="text-white hover:text-[#E50916] transition">
              <Link to="/add-movie" onClick={() => setMenuOpen(false)}>Add Movie</Link>
            </li>
            <li className="text-white hover:text-[#E50916] transition">
              <Link to="/show-data" onClick={() => setMenuOpen(false)}>Movie List</Link>
            </li>
          </ul>
        )}
      </div>
    </header>
    )
}

export default Header
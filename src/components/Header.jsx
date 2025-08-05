import { Link, useLocation, useNavigate } from "react-router-dom"

const Header = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    return (
        <header className={` ${pathname == "/show-data" ? "relative bg-[#161616]" : "absolute"}  w-full z-30 py-7`}>
            <div className="container mx-auto">
                <div className="flex items-center justify-between">
                    <div onClick={()=>navigate("/")} className="cursor-pointer">
                        <span className="text-2xl text-white tracking-widest">MovieDev</span>
                    </div>
                    <ul className="flex gap-5 items-center">
                        <li className="text-xl hover:text-[#E50916] transition-all text-white font-light">
                            <Link to={'/'}>Home</Link>
                        </li>
                        <li className="text-xl hover:text-[#E50916] transition-all text-white font-light">
                            <Link to={'/add-movie'}>Add Movie</Link>
                        </li>
                        <li className="text-xl hover:text-[#E50916] transition-all text-white font-light">
                            <Link to={'/show-data'}>Movie List</Link>
                        </li>
                        
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Header
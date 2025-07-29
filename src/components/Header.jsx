import { Link, useLocation } from "react-router-dom"

const Header = () => {
    const { pathname } = useLocation();

    return (
        <header className={` ${pathname == "/show-data" ? "relative bg-[#161616]" : "absolute"}  w-full z-30 py-7`}>
            <div className="container mx-auto">
                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-2xl text-white tracking-widest">MovieDev</span>
                    </div>
                    <ul className="flex gap-5 items-center">
                        <li className="text-xl text-white font-light">
                            <Link>Home</Link>
                        </li>
                        <li className="text-xl text-white font-light">
                            <Link>Add Movie</Link>
                        </li>
                        <li className="text-xl text-white font-light">
                            <Link>Admin</Link>
                        </li>
                        <li className="">
                            <button className="px-8 py-1 text-xl font-normal text-white bg-[#e50916]">Login</button>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Header
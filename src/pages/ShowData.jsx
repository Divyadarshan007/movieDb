import { useContext, useEffect } from "react"
import { AppContext } from "../App"
import axios from "axios";

const ShowData = () => {

    const { movies, setMovies } = useContext(AppContext);

    const fetchData = async () => {
        const { data } = await axios.get("http://localhost:8215/movies")
        setMovies(data)
    }
    useEffect(() => {
        fetchData()
    }, [])

    return (
        <section className="">
            <div className="container mx-auto">
                <div>
                    <button className="border">Add Movie</button>
                </div>
                <div className="relative overflow-x-auto py-10">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Title
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Image
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Genre
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                movies.map((movie, idx) => {
                                    return <tr key={idx} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {movie.title}
                                        </th>
                                        <td className="px-6 py-4">
                                            <div className="w-20">
                                                {movie.url && <img src={`${movie.url}`} alt="" />}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {movie.genre}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-5 cursor-pointer">
                                                <button>View</button>
                                                <button>delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                })
                            }

                        </tbody>
                    </table>
                </div>

            </div>
        </section>
    )
}

export default ShowData
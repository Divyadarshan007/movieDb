import { useContext, useEffect } from "react"
import { AppContext } from "../App"
import axios from "axios";
import { useNavigate } from "react-router-dom";


const ShowData = () => {

    const { movies, setMovies } = useContext(AppContext);
    const navigate = useNavigate()
    const fetchData = async () => {
        const { data } = await axios.get("http://localhost:8215/movies")
        setMovies(data)

    }
    useEffect(() => {
        fetchData()
    }, [])

    const handleEdit = (movieId) => {
        navigate(`/edit-movie/${movieId}`)
    }
    const handleDelete = async (movieId) => {
        await axios.delete(`http://localhost:8215/movies/${movieId}`)
        fetchData();
    }
    return (
        <section className="bg-[#161616] min-h-screen py-[60px] px-4">
            <div className="container mx-auto">


                <div className="mb-6">
                    <button
                        className="px-6 py-2 text-white bg-[#e50916] rounded-md text-lg font-medium hover:bg-[#c40813] transition duration-200"
                        onClick={() => navigate("/add-movie")}
                    >
                        Add Movie
                    </button>
                </div>


                <div className="overflow-x-auto rounded-md shadow-md">
                    {
                        movies.length ? <table className="min-w-full text-sm bg-[#221f1f] text-gray-300 border-separate border-spacing-0">


                            <thead className="bg-[#2c2c2c] text-gray-200 text-sm">
                                <tr>
                                    <th className="px-6 py-4 text-left font-semibold border-b border-gray-600">Title</th>
                                    <th className="px-6 py-4 text-center font-semibold border-b border-gray-600">Image</th>
                                    <th className="px-6 py-4 text-center font-semibold border-b border-gray-600">Genre</th>
                                    <th className="px-6 py-4 text-center font-semibold border-b border-gray-600">Actions</th>
                                </tr>
                            </thead>


                            <tbody>
                                {movies.map((movie, idx) => (
                                    <tr
                                        key={idx}
                                        className={idx % 2 === 0 ? "bg-[#1b1b1b]" : "bg-[#2a2a2a]"}
                                    >
                                        <td className="px-6 py-4 align-middle font-medium text-white whitespace-nowrap text-left">
                                            {movie.title}
                                        </td>
                                        <td className="px-6 py-4 align-middle text-center">
                                            <div className="w-20 mx-auto">
                                                {movie.url && (
                                                    <img
                                                        src={movie.url}
                                                        alt={movie.title}
                                                        className="rounded object-cover w-full h-auto"
                                                    />
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 align-middle capitalize text-center">
                                            {movie.genre}
                                        </td>
                                        <td className="px-6 py-4 align-middle text-center">
                                            <div className="flex justify-center flex-wrap gap-2">
                                                <button
                                                    onClick={() => navigate(`/desc/${movie.id}`)}
                                                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
                                                >
                                                    View
                                                </button>
                                                <button
                                                    onClick={() => handleEdit(movie.id)}
                                                    className="px-5 py-2 bg-yellow-400 hover:bg-yellow-500 text-black rounded transition"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(movie.id)}
                                                    className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table> : <div className="text-4xl text-white overflow-hidden text-center">
                            No data
                        </div>
                    }
                </div>

            </div>
        </section>



    )
}

export default ShowData
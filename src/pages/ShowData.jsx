import { useContext, useEffect, useState } from "react"
import { AppContext } from "../App"
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

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
        <section className="bg-[#161616] h-screen">
            <div className="container mx-auto">
                <div>
                    <button className="px-8 py-1 text-xl font-normal text-white bg-[#e50916]" onClick={() => navigate("/add-movie")}>Add Movie</button>
                </div>
                <div className="relative overflow-x-auto py-10 text-editor">
                    <table className="w-full text-sm text-left rtl:text-right bg-[#221f1f] text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase  dark:bg-gray-700 dark:text-gray-400">
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
                                    return <tr key={idx} className="">
                                        <th scope="row" className="px-6 py-4 text-white font-medium whitespace-nowrap ">
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
                                                <button onClick={() => navigate(`/desc/${movie.id}`)} className="border px-7 py-2">View</button>
                                                <button onClick={() => handleEdit(movie.id)} className="border px-7 py-2">Edit</button>
                                                <button onClick={() => handleDelete(movie.id)} className="border px-7 py-2">delete</button>
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
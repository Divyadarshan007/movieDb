import { useContext, useEffect, useState } from "react"
import { AppContext } from "../App"
import axios from "axios"
import { useParams } from "react-router-dom"

const Description = () => {
    const { movies, setMovies } = useContext(AppContext)
    const { id } = useParams();
    const [obj, setObj] = useState({})
    const fetchData = async () => {
        const { data } = await axios.get("http://localhost:8215/movies")
        setMovies(data)
        let movieData = data.find((movie) => {
            return movie.id == id;
        })
        console.log(movieData);
        
        setObj(movieData);
    }
    useEffect(() => {
        fetchData()
    }, [])
    
    
    return (
        <section className="bg-[#161616] h-screen">
            <div className="container mx-auto flex justify-center h-screen items-center">
                <div className="bg-[#221f1f] p-[30px] flex justify-between">
                  

                 <div className="text-editor w-1/2" dangerouslySetInnerHTML={{ __html: obj.desc }}>
                     
                 </div>
                 <div className="text-editor w-1/2 flex justify-end">
                       <img src={`${obj.url}`} alt="" className="h-[400px]" />
                 </div>
                </div>

            </div>
        </section>
    )
}

export default Description
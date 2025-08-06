import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import { div } from "framer-motion/client";

const Description = () => {
    const { id } = useParams();
    const [obj, setObj] = useState({})
    const fetchData = async () => {
        const { data } = await axios.get("http://localhost:8215/movies")

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
        <section className="bg-[#161616] min-h-screen py-[140px] px-4">
            <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">

                <div className="w-full lg:w-1/2 bg-[#221f1f] p-6 rounded-md shadow-md h-[700px] scrollbarWidth overflow-y-auto text-white">
                    {
                        (() => {
                            const tempDiv = document.createElement("div");
                            tempDiv.innerHTML = obj.desc || "";
                            const textContent = tempDiv.textContent?.trim();

                            return textContent
                                ? (
                                    <div
                                        className="text-editor prose prose-invert max-w-full"
                                        dangerouslySetInnerHTML={{ __html: obj.desc }}
                                    />
                                )
                                : (
                                    <div className="text-editor prose prose-invert max-w-full text-4xl text-white relative z-40">
                                        No data
                                    </div>
                                );
                        })()
                    }
                </div>

                <div className="w-full lg:w-1/2 flex justify-center">
                    <img
                        src={`${obj.url}`}
                        alt="Movie Visual"
                        className="max-h-[400px] w-auto rounded-md shadow-lg object-contain"
                    />
                </div>

            </div>
        </section>

    )
}

export default Description
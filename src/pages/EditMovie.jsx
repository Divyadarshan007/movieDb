import { useContext, useEffect, useRef, useState } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import axios from 'axios';
import { AppContext } from '../App';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { section } from 'framer-motion/client';
const EditMovie = () => {
    const editorRef = useRef();
    const navigate = useNavigate();
    const { id } = useParams()
    let instance;
    let markdown = useRef(null);
    const [input, setInput] = useState({
        title: '', url: '', genre: '', desc: ''
    })

    const [showModal, setShowModal] = useState(false)
    const [errors, setErrors] = useState({});
    const [editorSupported, setEditorSupported] = useState(true);
    let URL = "http://localhost:8215/movies"
    const fetchData = async () => {
        const { data } = await axios.get(URL)
        let obj = data.find((movie) => {
            return movie.id == id;
        })
        setInput(obj)
        console.log(obj);

    }
    useEffect(() => {
        fetchData();
    }, [])

    const handleGetContent = () => {
        try {
            instance = editorRef.current.getInstance();
            const html = instance.getHTML();
            markdown.current = html;
            setInput((prev) => ({ ...prev, desc: html }));
            setShowModal(!showModal);
        } catch (error) {
            setEditorSupported(false);
            toast.error("Editor not supported, switching to textarea.");
        }
    };
    const handleChange = (e) => {
        setInput({ ...input, [e.target.id]: e.target.value })
        setErrors((prev) => ({ ...prev, [id]: "" }));

    }

    const validateForm = () => {
        let formErrors = {};
        if (!input.title.trim()) formErrors.title = "Title is required.";
        if (!input.url.trim()) formErrors.url = "Image URL is required.";
        if (!input.genre) formErrors.genre = "Genre is required.";
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) {
            toast.error("Please fill in all required fields.");
            return;
        }

        const addData = async () => {
            const value = { ...input }
            await axios.put(`${URL}/${id}`, value);
            fetchData();
            toast.success("Movie added successfully!");
            navigate("/show-data")
        }
        addData()
    }
    return (
        <section className='bg-[#121212]'>
            <div className="back-image absolute inset-0 z-0 blur-sm"></div>
            <div className="container mx-auto px-4">
                <div className="relative min-h-screen flex items-center justify-center">
                    {showModal ? (
                        <motion.div
                            className="w-full max-w-4xl  bg-[#1c1c1c] p-6 rounded-md shadow-lg z-40 relative"
                            initial={{ opacity: 0, y: -40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                        >
                            <div className='text-end mb-3'>
                                <Link className="text-4xl hover:text-[#E50916] text-white" onClick={() => setShowModal(!showModal)}>
                                    ×
                                </Link>
                            </div>
                            {editorSupported ? (
                                <>
                                    <Editor
                                        initialValue={input.desc}
                                        previewStyle="vertical"
                                        height="400px"
                                        initialEditType="wysiwyg"
                                        useCommandShortcut={true}
                                        ref={editorRef}
                                    />
                                    <button
                                        className="mt-5 bg-[#e50916] hover:bg-[#c40813] text-white px-6 py-2 rounded transition"
                                        onClick={handleGetContent}
                                    >
                                        Save Description
                                    </button>
                                </>
                            ) : (
                                <div className="flex flex-col">
                                    <label className="text-white mb-1">Description</label>
                                    <textarea
                                        rows="6"
                                        value={input.description}
                                        onChange={(e) =>
                                            setInput((prev) => ({ ...prev, desc: e.target.value }))
                                        }
                                        className="bg-[#2a2a2a] text-white p-3 rounded resize-none"
                                    />
                                    <button
                                        className="mt-5 bg-[#e50916] hover:bg-[#c40813] text-white px-6 py-2 rounded transition"
                                        onClick={() => setShowModal(false)}>
                                        Save Description
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            className="w-full max-w-md bg-[#1c1c1c] p-8 rounded-lg shadow-lg text-white z-10"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-2xl font-semibold">Edit Movie</h4>
                                    <Link className="text-2xl hover:text-[#E50916]" to="/show-data">
                                        ×
                                    </Link>
                                </div>

                                {/* Title */}
                                <div className="flex flex-col">
                                    <label htmlFor="title" className="mb-1">Title</label>
                                    <input
                                        id="title"
                                        value={input.title}
                                        onChange={handleChange}
                                        type="text"
                                        className="bg-[#2a2a2a] px-4 py-2 rounded"
                                    />
                                    {errors.title && <span className="text-red-500 text-sm">{errors.title}</span>}
                                </div>

                                {/* URL */}
                                <div className="flex flex-col">
                                    <label htmlFor="url" className="mb-1">Image URL</label>
                                    <input
                                        id="url"
                                        value={input.url}
                                        onChange={handleChange}
                                        type="text"
                                        className="bg-[#2a2a2a] px-4 py-2 rounded"
                                    />
                                    {errors.url && <span className="text-red-500 text-sm">{errors.url}</span>}
                                </div>

                                {/* Image Preview */}
                                {input.url && (
                                    <div className="w-20 h-20 overflow-hidden mt-2 rounded border border-gray-600">
                                        <img src={input.url} alt="preview" className="object-cover w-full h-full" />
                                    </div>
                                )}

                                {/* Genre */}
                                <div className="flex flex-col">
                                    <label htmlFor="genre" className="mb-1">Genre</label>
                                    <select
                                        id="genre"
                                        value={input.genre}
                                        onChange={handleChange}
                                        className="bg-[#2a2a2a] px-4 py-2 rounded"
                                    >
                                        <option value="">Select genre</option>
                                        <option value="Horror">Horror</option>
                                        <option value="Drama">Drama</option>
                                        <option value="Comedy">Comedy</option>
                                        <option value="Action">Action</option>
                                        <option value="Science Fiction">Science Fiction</option>
                                        <option value="Thriller">Thriller</option>
                                        <option value="Romance">Romance</option>
                                    </select>
                                    {errors.genre && <span className="text-red-500 text-sm">{errors.genre}</span>}
                                </div>

                                {/* Description */}
                                <button
                                    type="button"
                                    className="w-full bg-[#e50916] hover:bg-[#c40813] text-white px-5 py-2 rounded transition"
                                    onClick={() => setShowModal(true)}
                                >
                                    Add Description
                                </button>
                                {errors.description && <span className="text-red-500 text-sm">{errors.description}</span>}

                                {/* Submit */}
                                <button
                                    type="submit"
                                    className="w-full bg-[#444] hover:bg-[#555] text-white px-5 py-2 rounded transition"
                                >
                                    Edit Movie
                                </button>
                            </form>
                        </motion.div>
                    )}
                </div>
            </div>
        </section>

    );
};
export default EditMovie;
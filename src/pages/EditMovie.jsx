import { useContext, useEffect, useRef, useState } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import axios from 'axios';
import { AppContext } from '../App';
import { Link, useNavigate, useParams } from 'react-router-dom';
const EditMovie = () => {

    const { movies, setMovies } = useContext(AppContext);
    const editorRef = useRef();
    const { id } = useParams()
    const navigate = useNavigate();
    let instance;
    let markdown = useRef(null);
    const [input, setInput] = useState({
        title: '', url: '', genre: '', desc: ''
    })

    const [showModal, setShowModal] = useState(false)
    let URL = "http://localhost:8215/movies"
    const fetchData = async () => {
        const { data } = await axios.get(URL)
       let obj= data.find((movie)=>{
            return movie.id === id
        })
        setMovies(data)
        setInput(obj)
    }
    useEffect(() => {
        fetchData();
    }, [])

    const handleGetContent = () => {
        instance = editorRef.current.getInstance();
        const html = instance.getHTML();
        markdown.current = html;
        console.log("Markdown:", markdown);
        console.log("HTML:", html);
        setShowModal(!showModal);
    };
    const handleChange = (e) => {
        setInput({ ...input, [e.target.id]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const addData = async () => {
            const value = { ...input, desc: markdown.current }
            const { data } = await axios.put(`${URL}/${id}`, value);
            setMovies([...movies, data])
            navigate("/show-data")
        }
        addData()
    }
    return (
        <div className='container mx-auto '>
            <div className="back-image"></div>
            <div className='flex justify-center items-center h-screen  '>
                {
                    showModal ? <div>
                        <div>
                            <Editor
                                initialValue={`${input.desc}`}
                                previewStyle="vertical"
                                height="500px"
                                initialEditType="wysiwyg"
                                useCommandShortcut={true}
                                ref={editorRef}
                            />
                            <button className='relative border my-5 text-white px-7 py-2' onClick={handleGetContent}>Get Content</button>
                        </div>
                    </div> : <div className=''>
                        <form onSubmit={handleSubmit} name="pms_login" id="pms_login" action="#" method="post">
                            <div className='flex items-start justify-between'>
                                <h4>Add Movie</h4>
                                <Link className='text-white text-4xl' to={'/'}>x</Link>
                            </div>
                            <p className="login-username flex flex-col">
                                <label htmlFor="user_login">Title</label>
                                <input required value={input.title} autoComplete='off' onChange={handleChange} type="text" name="log" id="title" className="input" size={20} />
                            </p>
                            <p className="login-password">
                                <label htmlFor="user_pass">URL</label>
                                <input required value={input.url} autoComplete='off' onChange={handleChange} type="text" name="pwd" id="url" className="input" size={20} />
                            </p>
                            <div className='w-10 h-10 overflow-hidden my-3'>
                                {input.url && <img src={input.url} alt="" />}

                            </div>
                            <p className="login-password">
                                <select name="" id="genre" className='bg-[#221f1f] px-7 py-3 text-white' value={input.genre} required onChange={handleChange}>
                                    <option value="">Select genre</option>
                                    <option value="Horror">Horror</option>
                                    <option value="Drama">Drama</option>
                                    <option value="Comedy">Comedy</option>
                                    <option value="Action">Action</option>
                                    <option value="Science Fiction">Science Fiction</option>
                                    <option value="Thriller">Thriller</option>
                                    <option value="Romance">Romance</option>
                                </select>
                            </p>
                            <div>
                                <button className='text-white bg-[#221f1f] px-7 py-2 mb-5' onClick={() => setShowModal(!showModal)}>Add Description</button>
                            </div>

                            <p className="login-submit">
                                <input type="submit" name="wp-submit" id="wp-submit" className="button button-primary" defaultValue="Edit" />
                                <input type="hidden" name="redirect_to" />
                            </p>
                        </form>
                    </div>
                }
            </div>
        </div>
    );
};
export default EditMovie;
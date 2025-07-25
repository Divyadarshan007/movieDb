import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import React from 'react';

function MyEditor({setShowModal,showModal}) {
    const editorRef = React.useRef();
    console.log(editorRef);
    const handleGetContent = () => {
        const instance = editorRef.current.getInstance();
        const markdown = instance.getMarkdown();
        const html = instance.getHTML();
        console.log("Markdown:", markdown);
        console.log("HTML:", html);
        setShowModal(!showModal)
    };
    return (
        <div>
            <Editor
                initialValue="Hello Toast UI Editor"
                previewStyle="vertical"
                height="500px"
                initialEditType="wysiwyg"
                useCommandShortcut={true}
                ref={editorRef} 
                />
            <button className='relative border my-5 text-white px-7 py-2' onClick={handleGetContent}>Get Content</button>
        </div>
    );
}

export default MyEditor

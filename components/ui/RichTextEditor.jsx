import ReactQuill from 'react-quill';

const RichTextEditor = ({ html, setHtml, id = 'editor' }) => {
    let toolbarId = `toolbar-${id}`;
    const htmlModules = {
        toolbar: { container: `#${toolbarId}` },
    };
    const formats = ['bold', 'italic', 'underline', 'list', 'bullet', 'link'];
    return (
        <>
            <div className="p-3">
                <ReactQuill
                    id={id}
                    theme="snow"
                    value={html}
                    onChange={setHtml}
                    formats={formats}
                    modules={htmlModules}
                    className="h-72"
                />
                <div id={toolbarId}>
                    <button className="ql-bold">b</button>
                    <button className="ql-italic">i</button>
                    <button className="ql-underline">u</button>
                    <button className="ql-list" value="ordered"></button>
                    <button className="ql-list" value="bullet"></button>
                    <button className="ql-link">link</button>
                </div>
            </div>
        </>
    );
};

export default RichTextEditor;

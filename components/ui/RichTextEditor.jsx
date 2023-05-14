import ReactQuill from 'react-quill';

const RichTextEditor = ({ html, setHtml, id = 'editor', style = 'h-72' }) => {
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
                    className={style}
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

import ReactQuill from 'react-quill';

const EditBio = ({ bio, setBio }) => {
    const bioModules = {
        toolbar: { container: '#toolbar-bio' },
    };
    const formats = ['bold', 'italic', 'underline', 'list', 'bullet', 'link'];
    return (
        <>
            <div className="p-3">
                <ReactQuill
                    id="bio"
                    theme="snow"
                    value={bio}
                    onChange={setBio}
                    formats={formats}
                    modules={bioModules}
                    className="h-72"
                />
                <div id="toolbar-bio">
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

export default EditBio;

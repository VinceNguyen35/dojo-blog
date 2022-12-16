import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [author, setAuthor] = useState("");
    const [isPending, setIsPending] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const blog = { title, body, author };

        setIsPending(true);

        fetch("http://localhost:8000/blogs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blog)
        })
        .then(() => {
            console.log("New blog added");
            setIsPending(false);
            navigate("/");
        });
    }

    return (
        <div className="create">
            <h2>Add a New Blog</h2>
            <form onSubmit={ handleSubmit }>
                <label>Blog Title:</label>
                <input
                    type="text"
                    required
                    value={ title }
                    onChange={ event => setTitle(event.target.value) }
                />
                <label>Blog Body:</label>
                <textarea 
                    required
                    value = { body }
                    onChange={ event => setBody(event.target.value) }
                ></textarea>
                <label>Blog Author:</label>
                <select
                    required
                    value={ author }
                    onChange={ event => setAuthor(event.target.value) }
                >
                    <option value="" disabled>Select a Name</option>
                    <option value="mario">mario</option>
                    <option value="yoshi">yoshi</option>
                </select>
                { !isPending && <button>Add Blog</button> }
                { isPending && <button disabled>Adding blog...</button> }
            </form>
        </div>
    );
}
 
export default Create;
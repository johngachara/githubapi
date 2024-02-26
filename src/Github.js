import React, { useState } from "react";

export default function Github() {
    const [data, setData] = useState(null);
    const [input, setInput] = useState('');
    const [error, setError] = useState('');
    const heading = <h3 className="text-center mt-5">GitHub API</h3>;

    function handleChange(event) {
        setInput(event.target.value.toLowerCase());
    }

    async function handleSubmit(event) {
        event.preventDefault();

          try {
            const response = await fetch(`https://api.github.com/users/${input}/repos`);

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Failed to fetch data: ${errorMessage}`);
            }

            const res = await response.json();
            setData(res);
            setError('');
        } catch (error) {
            console.error("Error fetching data:", error);
            setError(`Error: ${error.message}`);
        }
        }


    return (
        <div className="container">
            {heading}
            <form id="gitHubForm" onSubmit={handleSubmit}>
                <label htmlFor="usernameInput"></label>
                <input
                    id="usernameInput"
                    onChange={handleChange}
                    className="form-control mb-5"
                    type="text"
                    value={input}
                />
                <button type="submit" className="btn btn-primary ml-auto mb-5">
                    Search
                </button>
            </form>
            <ul id="userRepos" className="list-group mx-auto mb-5">
                {input && `Looking up ${input}`}
                {!data ? <p className="text-danger">{error}</p> : data.map((item) => (
                    <li key={item.id} className="list-group-item">{item.name}</li>
                ))}
            </ul>
        </div>
    );
}

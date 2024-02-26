import React, {useEffect, useRef, useState} from "react";
import VanillaTilt from "vanilla-tilt";

export default function Api() {
    const [data, setData] = useState(null);
    const [input, setInput] = useState('');
    const [error, setError] = useState('');
    const tiltRef = useRef()
    const heading = <h3 className="text-center mt-5">GitHub API</h3>;
    useEffect(()=>{
        const tiltNode = tiltRef.current
        VanillaTilt.init(tiltNode,{
            max:24,
            speed:400
        })

    },[])
    function handleChange(event) {
        setInput(event.target.value.toLowerCase());
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const response = await fetch(`https://api.github.com/users/${input}/repos`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');

            }

            const responseData = await response.json();
            setData(responseData);
            setError('');
        } catch (err) {
            setData(null);
            setError('User not found or an error occurred.');
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
                <button ref={tiltRef} type="submit" className="btn btn-primary ml-auto mb-5 data tilt">
                    Search
                </button>
            </form>
            <ul id="userRepos" className="list-group mx-auto mb-5">
                {input && `Looking up ${input}`}
                {data ? (
                    data.map((item) => (
                        <li key={item.id} className="list-group-item">{item.name}</li>
                    ))
                ) : (
                    <p>{error}</p>
                )}
            </ul>
        </div>
    );
}

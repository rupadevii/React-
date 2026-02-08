import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const KEY = import.meta.env.VITE_API_KEY;
const URL = `http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}`;

export default function Home() {
    const [input, setInput] = useState("");
    const [movie, setMovie] = useState(null);
    const navigate = useNavigate();
     
    async function fetchData(value) {
        try {
            const res = await fetch(`${URL}&t=${value}`);
            const data = await res.json();
            // console.log(data);
            if (data.Response === "True") {
                const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    
                const existingBookmark = bookmarks.find(
                    (item) => item.Title === data.Title,
                );
                if (existingBookmark) {
                    setMovie({ ...data, isBookmarked: true });
                } else {
                    setMovie({ ...data, isBookmarked: false });
                }
            } else {
                console.log("Response not found");
                setMovie(null);
            }
        } catch (error) {
            setMovie(null);
            console.log(error);
        }
    }
    
    function handleChange(e) {
        setInput(e.target.value);
        
        if (e.target.value.trim() === "") {
            setMovie(null);
            return;
        }
        
        // debouncedFunc(e.target.value, setMovie);
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchData(input)
        }, 1500)

        return () => clearTimeout(timer)
    }, [input])

    function handleClick() {
        navigate(`${movie.Title}`, { state: movie });
    }

    return (
        <main className="h-screen bg-stone-900 flex flex-col items-center justify-start pt-15">
        <div className="w-205 ml-120 justify-between flex">
            <form className="flex">
            <input
                type="text"
                value={input}
                onChange={handleChange}
                name="name"
                autoComplete="off"
                className="p-2 w-85 border-white border text-white rounded-md mr-3"
            />

            {/* <button className='bg-rose-900 px-3 py-2 text-white rounded-md '>Search</button> */}
            </form>
        </div>
        {movie && (
            <ul className="border-stone-400 border rounded-b-md p-2 w-85">
            {/* <Link to={`/${movie.Title}`}> */}
            <li onClick={handleClick} className="cursor-pointer">
                <div className="flex gap-3">
                <div>
                    <img src={movie.Poster} className="h-15" />
                </div>
                <div className="text-white">
                    <h2 className="my-1 hover:underline underline-offset-2">
                    {movie.Title}
                    </h2>
                    <h3 className="font-thin">{movie.Year}</h3>
                </div>
                </div>
            </li>
            {/* </Link> */}
            </ul>
        )}
        </main>
    );
}

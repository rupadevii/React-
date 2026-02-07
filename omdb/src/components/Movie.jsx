import { Star } from 'lucide-react'
import React, { useState } from 'react'
import { useLocation} from 'react-router-dom'

export default function Movie() {
    const location = useLocation();
    const currMovie = location.state
    const [movie, setMovie] = useState(currMovie)
    
    function removeBookmark(){
        setMovie((prev) => ({...prev,isBookmarked: false}))
        const bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

        const newBookmarks = bookmarks.filter((item) => item.Title !== movie.Title)
        localStorage.setItem("bookmarks", JSON.stringify(newBookmarks))
    }

    function addBookmark(){
        const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || []
        setMovie({...currMovie, isBookmarked: true})

        bookmarks.push({...currMovie, isBookmarked: true})
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
        console.log(bookmarks)
    }
    
    return (
        <main className='h-screen bg-stone-900 flex justify-center'>
        {movie && (<div className='text-white pt-12 w-275 '>
            <div className='flex w-full justify-between'>
                <h1 className='text-4xl mb-8'>{movie.Title}</h1>
                {movie.isBookmarked ? (
                    <span className='mr-5 mt-5 cursor-pointer' onClick={removeBookmark}>
                        <Star fill="green" strokeWidth={0}/>
                    </span>
                ) : (
                    <span className='mr-5 mt-5 cursor-pointer' onClick={addBookmark}>
                        <Star/>
                    </span>
                )}
            </div>
            <div className='flex gap-8'>
                <img src={movie.Poster} className='h-95'/>
                <div className='mt-3'>
                    <p className='text-xl text-gray-200'>{movie.Plot}</p>
                    <h2 className='my-3 text-lg'><span className='text-rose-600'>Cast:</span> {movie.Actors}</h2>
                    <p className='italic mb-3 text-gray-400'>{movie.Language}</p>
                    <h3>Rating: {movie.imdbRating}</h3>
                    <h2 className='my-3 text-lg'>Year: {movie.Year}</h2>
                </div>
            </div>
            </div>
            )}

        </main>

    )

    
}

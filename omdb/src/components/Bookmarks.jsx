import { Star } from 'lucide-react'
import React, { useState } from 'react'

export default function Bookmarks() {
    const [bookmarks, setBookmarks] = useState(JSON.parse(localStorage.getItem("bookmarks")))
    
    function removeBookmark(title){
        const currBookmarks = JSON.parse(localStorage.getItem("bookmarks"));
        const updatedBookmarks = currBookmarks.filter(item => item.Title !== title)
        setBookmarks(updatedBookmarks)
        localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks))
    }

    return (
        <main className=' bg-stone-900 text-white flex items-center flex-col pt-8 min-h-screen'>
            <h1 className='text-3xl'>Bookmarks</h1>
            {bookmarks?.map((item, index) => (
                <div className='w-175 mt-4 border-b-gray-400 border-b pb-6' key={index}>
                    <div className='flex justify-between'>
                        <h1 className='text-2xl my-5'>{item.Title}</h1>
                        <span className='mr-5 mt-5 cursor-pointer' onClick={() => removeBookmark(item.Title)}>
                            <Star fill="green" strokeWidth={0}/>
                        </span>
                    </div>
                    <div className='flex gap-8'>
                        <img src={item.Poster} className='h-95'/>
                        <div className='mt-3'>
                            <p className='text-xl text-gray-200'>{item.Plot}</p>
                            <h2 className='my-3 text-lg'><span className='text-rose-600'>Cast:</span> {item.Actors}</h2>
                            <p className='italic mb-3 text-gray-400'>{item.Language}</p>
                            <h3>Rating: {item.imdbRating}</h3>
                            <h2 className='my-3 text-lg'>Year: {item.Year}</h2>
                        </div>
                    </div>
                </div>
            ))}
        </main>
    )
}

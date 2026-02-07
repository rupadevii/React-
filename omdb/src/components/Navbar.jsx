import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
    const location = useLocation()

    return (
        <header>
            <nav className='py-6 px-12 bg-rose-900 flex justify-between'>
                <div>...</div>
                {
                    location.pathname === "/bookmarks" ? (
                         <Link to="/"><button className='text-white hover:underline cursor-pointer text-lg'>Home</button></Link>
                    ) : (
                        <Link to="/bookmarks"><button className='text-white hover:underline cursor-pointer text-lg'>Bookmarks</button></Link>
                    )
                }
            </nav>
        </header>
    )
}

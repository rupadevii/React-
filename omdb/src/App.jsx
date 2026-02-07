import { Routes, Route} from 'react-router-dom'
import Bookmarks from './components/Bookmarks'
import Movie from './components/Movie'
import Navbar from './components/Navbar'
import Home from './components/Home'

export default function App() {
  return (
    <>
    <Navbar/>
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/:title" element={<Movie/>}/>
        <Route path="/bookmarks" element={<Bookmarks/>}/>
    </Routes>
    
    </>
  )
}

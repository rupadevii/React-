import React, { useContext} from 'react'
import Navbar from './components/Navbar'
import Board from './components/Board';
import { BoardContext } from './context/BoardContext';

export default function App() {
  const {boards} = useContext(BoardContext)

  return (
    <div>
      <Navbar/>
      <main className="p-6 pt-8 w-full">
        <div className="m-4 grid xl:grid-cols-1 gap-6  md:grid-cols-2 lg:grid-cols-3">
          {boards.map((board) => (
            <Board key={board.id} board={board}/>
          ))}
        </div>
    </main>
    </div>
  )
}

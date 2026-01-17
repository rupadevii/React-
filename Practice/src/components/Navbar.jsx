import { useContext } from 'react';
import { v4 as uuid } from 'uuid';
import {BoardContext} from '../context/BoardContext';

export default function Navbar() {
  const {boards, handleChange} = useContext(BoardContext)
  
  function addBoard(){
    const content = prompt("Enter your Board title", "New Board");

    const title = content.trim();

    if (!title) return;

    const newBoards = [
      ...boards,
      { 
        id: uuid(),
        title,
        lists: []
      }
    ]

    handleChange(newBoards)
  }

  return (
    <nav className='py-4 h-18 bg-red-950 flex items-center justify-between'>
      <div className='text-white font-bold text-lg ml-10'>MT</div>
      <button 
        className='bg-white px-1 py-1 md:px-4 md:py-2 rounded text-sm text-slate-900 mr-10'
        onClick={addBoard}>
          + New Board
      </button>
    </nav>
  )
}

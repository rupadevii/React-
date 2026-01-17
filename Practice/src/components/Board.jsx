import { useContext } from 'react';
import List from './List'
import { v4 as uuid } from 'uuid';
import { BoardContext } from '../context/BoardContext';

const Board = ({board}) => {
    const {boards, handleChange} = useContext(BoardContext);

    function addList(boardID){
        const content = prompt("Enter your List title", "New List");

        const title = content.trim();

        if(!title) return;

        const newBoards = boards.map(board => 
            board.id === boardID ? {
                ...board,
                lists: [
                    ...board.lists,
                    {
                        id: uuid(),
                        title,
                        cards: []
                    }
                ]
            } : board
        )

        handleChange(newBoards)
    }

    function deleteBoard(boardID){
        const consent = confirm("Do you really want to delete this board?")

        if(!consent) return;

        const newBoards = boards.filter((board) => board.id !== boardID);

        handleChange(newBoards)
    }
   
    return (
        <div className='bg-zinc-900 text-white p-4 border border-stone-700 rounded-xl flex shadow flex-col gap-3 w-full'>
            <div className="flex items-start gap-3 px-5 ">
                <h3 className="flex-1 text-xl">{board.title}</h3>
                <button 
                    className="rounded-full px-2 py-1 hover:bg-zinc-700 border border-white hover:border-black"
                    onClick={() => addList(board.id)}>
                        <i className="fa-solid fa-plus"></i>
                </button>
                <button 
                    className="rounded-full px-2 py-1 hover:bg-zinc-700 border border-white hover:border-black"
                    onClick={() => deleteBoard(board.id)}>
                        <i className="fa fa-trash"></i>
                </button>
            </div>
            <div className= "board flex-wrap lg:flex-nowrap flex items-start gap-4 m-2">
                {board.lists ? board.lists.map((list) => (
                    <List key={list.id} list={list} boardID={board.id}/>
                )): null}
            </div>
        </div>
    )
}

export default Board
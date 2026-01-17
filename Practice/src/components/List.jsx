import { useContext } from 'react';
import Card from './Card'
import { v4 as uuid } from 'uuid';
import { BoardContext } from '../context/BoardContext';

const List = ({boardID, list}) => {
    const {boards, handleChange} = useContext(BoardContext);

    function addCard(boardID, listID){
        const content = prompt("Enter your card title", "New Card")

        const title = content.trim();

        if(!title) return;
        
        const newBoards = boards.map(board => 
            board.id === boardID ? {
                ...board,
                lists: board.lists.map(list => 
                    list.id === listID ? {
                        ...list,
                        cards: [
                            ...list.cards,
                            {
                            id: uuid(),
                            title
                            }
                        ]
                     } : list
                )
            } : board
        )
        handleChange(newBoards)
    }

    function deleteList(boardID, listID){
        const consent = confirm("Do you really want to delete this list?");

        if(!consent) return;

        // const board = boards.find((board) => board.id === boardID);
        // board.lists = board.lists.filter((list) => list.id !== listID);
        const newBoards = boards.map(board => 
            board.id === boardID ? {
                ...board,
                lists: board.lists.filter(list => list.id !== listID)
            } : board
        )

        handleChange(newBoards)
    }

    return (
        <div className='list bg-zinc-800 mt-1 py-3 px-4 rounded-md flex flex-col gap-2 w-100 lg:w-75 lg:shrink-0'>  
            <div>
                <div className="flex justify-between items-center ml-2">
                    <h3 className="text-lg">{list.title}</h3>
                    <div>
                        <button 
                            className="rounded-full px-2 py-1 hover:bg-zinc-900"
                            onClick={() => addCard(boardID, list.id)}><i className="fa-solid fa-plus"></i></button>
                        <button 
                            className="rounded-full px-3 py-2 hover:bg-zinc-900"
                            onClick={() => deleteList(boardID, list.id)}><i className="fa fa-trash"></i></button>
                    </div>
                </div>

                <div className="lists flex flex-col gap-3 mt-2">
                    {list.cards.map((card) => (
                        <Card key={card.id} card={card} listID={list.id} boardID={boardID}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default List

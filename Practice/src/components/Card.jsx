import { useContext } from "react";
import { BoardContext } from "../context/BoardContext";

const Card = ({card, listID, boardID}) => {
    const {boards, handleChange} = useContext(BoardContext);

    function deleteCard(cardID){
        const consent = confirm("Do you really want to delete this card?")

        if(!consent) return;

        const newBoards = boards.map(board => 
            board.id === boardID ? {
                ...board,
                lists: board.lists.map(list => 
                    list.id === listID ? {
                        ...list,
                        cards: list.cards.filter(card => card.id !== cardID)
                    } : list
                )
            }: board
        )
        handleChange(newBoards)
    }

    return (
        <div className="bg-zinc-900 border-b border-s border-gray-600 px-4 py-3 rounded flex items-center hover:bg-zinc-700 hover:cursor-pointer">
            <h3 className="flex-1">{card.title}</h3>
            <div>
                <button className="rounded-full px-2 py-1 hover:bg-zinc-900"><i className="fas fa-ellipsis-v"></i></button>
                <button 
                    className="rounded-full px-2 py-1 hover:bg-zinc-900"
                    onClick={() => deleteCard(card.id)}><i className="fa fa-trash"></i>
                </button>
            </div>
        </div>
    )
}

export default Card

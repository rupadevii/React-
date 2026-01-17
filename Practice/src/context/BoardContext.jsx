import React, { createContext, useState } from 'react'

const BoardContext = createContext();

const BoardProvider = ({children}) => {
    const [boards, setBoards] = useState(() => {
        return JSON.parse(localStorage.getItem("trello_clone")) || [{
        id: 1,
        title: "New Board",
        lists: [{
            id: 1,
            title: "New List",
            cards: [{
                id: 1,
                title: "New Card"
            },
            { 
                id: 2,
                title: "New Card 2"
            }]},
            {
                id: 2,
                title: "New List 2",
                cards: [{
                id: 1,
                title: "New Card"
                }]
            }]
        }]
    })

    function handleChange(value){
        setBoards(value)
        
        localStorage.setItem("trello_clone", JSON.stringify(value))
    }
    
    return (
        <BoardContext.Provider value={{boards, handleChange}}>
            {children}
        </BoardContext.Provider>
    )
}

export {BoardContext, BoardProvider}

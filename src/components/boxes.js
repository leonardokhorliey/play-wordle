
import React from 'react'

const Boxes = ({numberOfAttempts, numberOfLetters}) => {
    const NUMBER_OF_ATTEMPTS = numberOfAttempts
    const NUMBER_OF_LETTERS = numberOfLetters

    

    let wordRow = Array.from(Array(NUMBER_OF_LETTERS), (f, j) => {
        return <div key= {j} className= "letter-box" >
            {''}
        </div>
    })

    let gameBox = Array.from(Array(NUMBER_OF_ATTEMPTS), (e, i) => {
        return <div key= {i} className= "word-entry" >
            {wordRow}
        </div>
    })
    


    return (
        <div id = "game-board">
            {gameBox}
        </div>
    )

}


export default Boxes 
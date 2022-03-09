import {useState, useEffect} from 'react';

const Report = ({attempts, letterCount, pass, totalAttempts, restart, word, maxLetters, indices}) => {
    const [playNewGame, setPlayNewGame] = useState(false)
    const [numOfLetters, setNumOfLetters] = useState(5)

    useEffect(() => {
        let k = Array.from(document.getElementsByClassName("letter-box-result"))
        
        k.map((box, i) => {
            if (indices[0].includes(k.indexOf(box))) box.style.backgroundColor = 'green'
            else if (indices[1].includes(k.indexOf(box))) box.style.backgroundColor = 'yellow'
            else box.style.backgroundColor = 'grey'
        })
    })

    
    let wordRow = Array.from(Array(letterCount), (f, j) => {
        return <div key= {j} className= "letter-box-result" >
            {''}
        </div>
    })

    let gameBoxResult = Array.from(Array(attempts), (e, i) => {
        return <div key= {i} className= "word-entry" >
            {wordRow}
        </div>
    })

    const decreaseLetterCount = () => {
        if (numOfLetters === 5) return
        setNumOfLetters(numOfLetters - 1)
    }

    const increaseLetterCount = () => {
        if (numOfLetters === maxLetters) return
        setNumOfLetters(numOfLetters + 1)
    }

    const startGame = () => {
        setPlayNewGame(true)
    }

    return (
        <div className = "report-cover">
            <div className= "report-card">
                
                {!playNewGame && <div>
                    {pass ? (<>
                    <h1>
                        Congratulations!!!
                    </h1>

                    <p>
                        {`You successfully got the word: "${word.toUpperCase()}" in ${attempts}/${totalAttempts} tries.`}
                    </p>

                    <div id= "game-board-result">
                        {gameBoxResult}
                    </div>
                    </>) : (<>
                    <h1>
                        Sorry.
                    </h1>

                    <p>
                        {`You could not guess the word: "${word.toUpperCase()}" in ${totalAttempts} tries.`}
                    </p>
                    </>)}
                </div>}
                

                {
                    playNewGame && (<>
                        <h1>
                            Play Again
                        </h1>
        
                        <p style= {{fontSize: "20px"}}>
                            {`Enter the number of letters you want to try for. For now, Wordle Clone only supports 5 to ${maxLetters} letters.`}
                        </p>
        
                        <div className= "letter-count-change">
                            <button onClick= {decreaseLetterCount}>
                                -
                            </button>
                            <div>
                                {numOfLetters}
                            </div>
                            <button onClick= {increaseLetterCount}>
                                +
                            </button>
                        </div>
                        </>)
                }

                <button className= "report-card-button" onClick= {playNewGame ? () => restart(numOfLetters) : startGame}>
                    {playNewGame ? 'Play' : 'Play Again'}
                </button>

            </div>
        </div>
        
    )
}

export default Report
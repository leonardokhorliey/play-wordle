
import './App.css';
import ScreenKeyboard from './components/screen-keyboard';
import Boxes from './components/boxes';
import Report from './components/report';
import {useState} from 'react';
import { WORDS } from './words';

function App() {
  
  

  const [NUMBER_OF_ATTEMPTS, setNUMBER_OF_ATTEMPTS] = useState(6)
  const [NUMBER_OF_LETTERS, setNUMBER_OF_LETTERS] = useState(5)
  const [word, setWord] = useState(WORDS[0][Math.floor(Math.random()*WORDS[0].length)])
  const [numOfAttempts, setNumOfAttempts] = useState(0)
  const [lettersEntered, setLettersEntered] = useState(0)
  const [lettersGuessed, setLettersGuessed]  = useState([])
  const [passedGuess, setPassedGuess] = useState(false)
  const [greenIndexes, setGreenIndexes]  = useState([])
  const [yellowIndexes, setYellowIndexes]  = useState([])
  const [presentReport, setPresentReport] = useState(false)

  
  
  const insertEntry = (letter) => {
    if (lettersEntered === NUMBER_OF_LETTERS) return

    let k = numOfAttempts * NUMBER_OF_LETTERS + lettersEntered
    document.getElementsByClassName('letter-box')[k].textContent = letter
    setLettersEntered(lettersEntered + 1)
    setLettersGuessed([...lettersGuessed, letter])
    
  }

  const deleteEntry = () => {
    if (lettersEntered === 0) return
    let lastEntry = lettersGuessed[lettersGuessed.length - 1]
    let k = numOfAttempts * NUMBER_OF_LETTERS + lettersEntered - 1
    document.getElementsByClassName('letter-box')[k].textContent = ''
    setLettersEntered(lettersEntered - 1)
    setLettersGuessed(lettersGuessed.filter((t) => {return t !== lastEntry}))
  }

  const checkWord = () => {
    if (lettersEntered < NUMBER_OF_LETTERS) return
    let lettersOfWord = word.split('')
    let lettersOfWordDuplicate = lettersOfWord.map((t) => t)
    let arraytoCheck = lettersGuessed.map((t) => t)
    console.log(lettersOfWord)
    
    let k = numOfAttempts * NUMBER_OF_LETTERS
    let count = 0
    let finished = false
    
    let greenIndices = []
    let yellowIndices = []

    

    for (let i = 0; i < lettersOfWordDuplicate.length; i++) {
      if  (lettersOfWordDuplicate[i] === arraytoCheck[i]) {
        greenIndices.push(k + i)
        lettersOfWord.splice(lettersOfWord.indexOf(arraytoCheck[i]), 1)
        arraytoCheck[i] = ' '
        count += 1
      }
    }

    
    

    arraytoCheck.map((letter, i) => {

      if (lettersOfWord.includes(letter)) {
        yellowIndices.push(k + i)
        lettersOfWord.splice(lettersOfWord.indexOf(letter), 1)
      }
      return 1
      

    })

    colorBoxes(yellowIndices, greenIndices, lettersGuessed, k)
    //console.log(yellowIndices)
    setYellowIndexes([...yellowIndexes, ...yellowIndices])
    setGreenIndexes([...greenIndexes, ...greenIndices])
    
    //console.log(lettersOfWordDuplicate)
    setNumOfAttempts(numOfAttempts + 1)
    setLettersEntered(0)
    setLettersGuessed([])
    setTimeout(() => {
      if (count === NUMBER_OF_LETTERS) {
        finished = true
        setPassedGuess(true)
      }
      console.log(numOfAttempts)
      setPresentReport((numOfAttempts === NUMBER_OF_ATTEMPTS - 1) || finished)
    }, 100 * (NUMBER_OF_LETTERS + 5))
    
  }

  const colorBoxes = (yellowIndices, greenIndices, lettersGuessed, k) => {
    let pk = Array.from(document.getElementsByClassName("letter-box")).slice(k, k + NUMBER_OF_LETTERS)
    
        
    pk.map((box, i) => {
      setTimeout(() => {
        if (greenIndices.includes(pk.indexOf(box) + k)) {
          box.style.backgroundColor = 'green'
          colorKeyboard(lettersGuessed[i], 'green')
        }
        else if (yellowIndices.includes(pk.indexOf(box) + k)) {
          box.style.backgroundColor = 'yellow'
          colorKeyboard(lettersGuessed[i], 'yellow')

        }
        else {
          box.style.backgroundColor = 'grey'
          colorKeyboard(lettersGuessed[i], 'grey')
        }
      }, 100 * i)
    })
  }

  const keyEntry = (letter) => {
    if (letter === 'Delete') {
      deleteEntry()
      return
    }

    if (letter === 'Enter') {
      checkWord()
      return
    }

    insertEntry(letter)
  }

  const restartGame = (choice) => {
    setWord(WORDS[choice - 5][Math.floor(Math.random()*WORDS[choice - 5].length)])
    setPassedGuess(false)
    setPresentReport(false)
    setNumOfAttempts(0)
    setNUMBER_OF_ATTEMPTS(choice + 1)
    setNUMBER_OF_LETTERS(choice)
    setGreenIndexes([])
    setYellowIndexes([])
    let k = Array.from(document.getElementsByClassName('letter-box'))
    let p = Array.from(document.getElementsByClassName('keyboard-key'))
    k.map((box) => {
      box.style.backgroundColor = 'transparent'
      box.textContent = ''
      return 1
    })

    p.map((key) => key.style.backgroundColor = 'white' )
  }

  const colorKeyboard = (letter, color) => {
    let keys = Array.from(document.getElementsByClassName("keyboard-key"))
    let p = keys[keys.findIndex((t) => t.textContent === letter)]
    if (p.style.backgroundColor === 'green') return
    if (p.style.backgroundColor === 'yellow' && color === 'green') {
      p.style.backgroundColor = color
      return
    }
    p.style.backgroundColor = color
  }

  const onKeyPress = (e) => {
    console.log(e.key)
  }

  
  return (
    <div className="App" onKeyDown = {onKeyPress} tabIndex = "0">
      <header className="App-header">
        <h1>Wordle Clone</h1>
        <Boxes numberOfAttempts = {NUMBER_OF_ATTEMPTS} numberOfLetters = {NUMBER_OF_LETTERS}  />
        <ScreenKeyboard btnClick = {keyEntry} />
        {presentReport && <Report attempts= {numOfAttempts} letterCount= {NUMBER_OF_LETTERS} pass = {passedGuess} totalAttempts= {NUMBER_OF_ATTEMPTS} restart = {restartGame} word = {word} maxLetters = {WORDS.length + 4} indices = {[greenIndexes, yellowIndexes]}/>}
        
        
        <p className= "copyright">
          Designed by <span>
            <a
            className="App-link"
            href="https://www.linkedin.com/in/oluebubechukwu-okoli-14716a11b"
            target="_blank"
            rel="noopener noreferrer"
            >
              Ebube Okoli
            </a>
          </span>. 2022
        </p>
        <a
          className="App-link"
          href="https://github.com/leonardokhorliey/play-wordle"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </header>
    </div>
  );
}

export default App;

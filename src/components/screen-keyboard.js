

const ScreenKeyboard = ({btnClick}) => {

    const LETTERS = ['qwertyuiop'.split(''), 'asdfghjkl'.split(''), ['Delete', ...'zxcvbnm'.split(''), 'Enter']]

    
    

    return (
        <div id = "keyboard">
            {
            LETTERS.map((letterRow, i) => {
                return <div key = {i} className= "keyboard-row">
                    {
                        letterRow.map((letter, j) => {
                            return <button key = {j} className= "keyboard-key" onClick= {() => btnClick(letter)}>
                                {letter}
                            </button>
                        })
                    }
                </div>
            })
            }
        </div>
        
    )
}


export default ScreenKeyboard
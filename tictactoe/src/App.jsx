import { useState } from "react"
import './App.css'

const calculateWin = (items) => {
  const combos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  
  for (let i = 0; i < combos.length; i++) {
    const [a, b, c] = combos[i]
    if (items[a] && items[a] === items[b] && items[a] === items[c]) {
      return items[a]
    }
  }
  return null
}

// eslint-disable-next-line react/prop-types
const Box = ({handleKeyDown, value}) => {
  return(
    <td contentEditable className="cell" onKeyDown={handleKeyDown} value={value}>
      {/* <input className="cell" onKeyDown={handleKeyDown} maxLength={1}/> */}
    </td>
  )
}

const Board = () => {
  const [values, setValues] = useState(Array(9).fill(null))
  const [keys, setKeys] = useState([])
    
  const winner = calculateWin(values)
  let status
  if(winner){
    status = "winner is " + winner
  }
  else{
    status = 'Next player: ' + (keys[keys.length - 1] === 'x' ? 'O' : 'X')
  }

  const handleKeyPress = (e, i) => {
    if((e.key === 'x' || e.key === 'o'))
    {
      if((keys.length === 0 ) || (e.key !== keys[keys.length - 1])){
        setKeys([...keys, e.key])
      }
    }
    else e.preventDefault()

    if(e.key === keys[keys.length - 1]){
      e.preventDefault()
    }

    const copy = values.slice()
    if(e.key === 'x' || e.key === 'o'){
      copy[i] = e.key
    }
    setValues(copy)       
  }

  return(
    <>
      <span>{status}</span>
      <table>
        <tbody>
          <tr>
            <Box id={0} value={values[0]} handleKeyDown={(e) => handleKeyPress(e,0)}/>
            <Box id={1} value={values[1]} handleKeyDown={(e) => handleKeyPress(e,1)}/>
            <Box id={2} value={values[2]} handleKeyDown={(e) => handleKeyPress(e,2)}/>
          </tr>
          <tr>
            <Box id={3} value={values[3]} handleKeyDown={(e) => handleKeyPress(e,3)}/>
            <Box id={4} value={values[4]} handleKeyDown={(e) => handleKeyPress(e,4)}/>
            <Box id={5} value={values[5]} handleKeyDown={(e) => handleKeyPress(e,5)}/>
          </tr>
          <tr>
            <Box id={6} value={values[6]} handleKeyDown={(e) => handleKeyPress(e,6)}/>
            <Box id={7} value={values[7]} handleKeyDown={(e) => handleKeyPress(e,7)}/>
            <Box id={8} value={values[8]} handleKeyDown={(e) => handleKeyPress(e,8)}/>
          </tr>
        </tbody>
      </table>
    </>
  )
}
const App = () => {
  return(
    <div>
      <Board/> 
    </div>
  )
}

export default App
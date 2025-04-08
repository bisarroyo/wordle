import { useEffect, useState } from 'react'

import './App.css'
import Line from './components/Line'

function App() {
  const [solution, setSolution] = useState('hello')
  const [current, setCurrent] = useState('')
  const [wordle, setWordle] = useState(new Array(6).fill(null))
  const [isGameOver, setIsGameOver] = useState(false)
  useEffect(() => {
    setSolution('hello')
  }, [])

  useEffect(() => {
    function onKeyUp(event) {
      if (isGameOver) {
        return
      }
      const { key } = event
      if (key == 'Enter') {
        if (current.length !== 5) {
          return
        }
        const isCorrect = solution === current
        if (isCorrect) {
          setIsGameOver(true)
        }
        const newWordle = [...wordle]
        const actualWordleIndex = wordle.findIndex((val) => val == null)
        newWordle[actualWordleIndex] = current
        setWordle(newWordle)
        setCurrent('')
      }
      if (key == 'Backspace') {
        setCurrent((prevState) => prevState.slice(0, -1))
        return
      }
      if (current.length >= 5) {
        return
      }

      setCurrent((prevState) => (prevState += key))
    }
    window.addEventListener('keydown', onKeyUp)

    return () => {
      window.removeEventListener('keydown', onKeyUp)
    }
  }, [current, solution, wordle, isGameOver])
  return (
    <main>
      <h1>Wordle</h1>
      {wordle.map((word, index) => {
        const isCurrent = index === wordle.findIndex((val) => val == null)
        return (
          <Line
            key={index}
            currentTyping={isCurrent ? current : word ?? ''}
            solution={solution}
            isLastWord={wordle[index] !== null && !isCurrent}
          />
        )
      })}
      {isGameOver && 'Game Over'}
    </main>
  )
}

export default App

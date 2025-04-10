import { useCallback, useEffect, useState } from 'react'
import { words } from './utils/data'

import './App.css'
import Line from './components/Line'
import Keyboard from './components/Keyboard'
import Options from './components/Options'

function App() {
  const [solution, setSolution] = useState('hello')
  const [current, setCurrent] = useState('')
  const [wordle, setWordle] = useState(new Array(6).fill(null))
  const [isGameOver, setIsGameOver] = useState(false)
  useEffect(() => {
    const randomWord = words[Math.floor(Math.random() * (words.length - 1))]
    setSolution(randomWord)
  }, [])

  const handleGame = useCallback(
    (key) => {
      if (isGameOver) return

      if (key === 'Next') {
        setWordle(new Array(6).fill(null))
        setCurrent('')
        const randomWord = words[Math.floor(Math.random() * (words.length - 1))]
        setSolution(randomWord)
      }

      if (key === 'Enter') {
        if (current.length !== 5) return

        const isCorrect = solution === current
        if (isCorrect) {
          setIsGameOver(true)
        }

        const newWordle = [...wordle]
        const actualWordleIndex = wordle.findIndex((val) => val == null)
        newWordle[actualWordleIndex] = current
        setWordle(newWordle)
        setCurrent('')
        return
      }

      if (key === 'Backspace') {
        setCurrent((prevState) => prevState.slice(0, -1))
        return
      }

      if (current.length >= 5 || key.length !== 1 || !/^[a-zA-Z]$/.test(key)) {
        return
      }

      setCurrent((prevState) => prevState + key.toLowerCase())
    },
    [current, solution, wordle, isGameOver]
  )

  useEffect(() => {
    const onKeyUp = (event) => {
      handleGame(event.key)
    }

    window.addEventListener('keydown', onKeyUp)
    return () => {
      window.removeEventListener('keydown', onKeyUp)
    }
  }, [handleGame])

  const getKeyStatuses = (wordle, solution) => {
    const status = {}

    wordle.forEach((word) => {
      if (!word) return
      for (let i = 0; i < word.length; i++) {
        const letter = word[i]
        if (solution[i] === letter) {
          status[letter.toUpperCase()] = 'correct'
        } else if (solution.includes(letter)) {
          // Evita sobreescribir correct con close
          if (status[letter.toUpperCase()] !== 'correct') {
            status[letter.toUpperCase()] = 'close'
          }
        } else {
          if (!status[letter.toUpperCase()]) {
            status[letter.toUpperCase()] = 'incorrect'
          }
        }
      }
    })

    return status
  }

  const keyStatuses = getKeyStatuses(wordle, solution)

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
      <Keyboard onKeyPressed={handleGame} keysPressed={keyStatuses} />
      <Options onKeyPressed={handleGame} />
      <p>{isGameOver && 'Game Over'}</p>
    </main>
  )
}

export default App

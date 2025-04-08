import React, { useState } from 'react'

function Line({ currentTyping, solution, isLastWord }) {
  const letters = new Array(5).fill('')
  const typed = currentTyping.padEnd(5) // Asegura que tenga 5 caracteres

  let status = new Array(5).fill('') // ["correct", "close", "incorrect"]
  const solutionArray = solution.split('')
  const solutionCopy = [...solutionArray]

  if (isLastWord) {
    // 1. Marcar correctas
    for (let i = 0; i < 5; i++) {
      if (typed[i] === solutionArray[i]) {
        status[i] = 'correct'
        solutionCopy[i] = null // marcar como usada
      }
    }

    // 2. Marcar close
    for (let i = 0; i < 5; i++) {
      if (status[i] !== '') continue
      const indexInSolution = solutionCopy.indexOf(typed[i])
      if (indexInSolution !== -1) {
        status[i] = 'close'
        solutionCopy[indexInSolution] = null // marcar como usada
      } else {
        status[i] = 'incorrect'
      }
    }
  }

  return (
    <div className='wordle-container'>
      {letters.map((_, index) => {
        const char = typed[index]
        let className = 'word'

        if (isLastWord) {
          className += ' ' + status[index]
        }

        return (
          <span key={index} className={className}>
            {char}
          </span>
        )
      })}
    </div>
  )
}

export default Line

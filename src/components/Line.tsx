import React from 'react'

function Line({ currentTyping, solution, isLastWord }) {
  const lines = new Array(5).fill('')

  return (
    <div className='wordle-container'>
      {lines.map((_, index) => {
        let className = 'word'
        console.log(isLastWord)
        if (isLastWord) {
          if (currentTyping[index] === solution[index]) {
            className += ' correct'
          } else if (solution.includes(currentTyping[index])) {
            className += ' close'
          } else {
            className += ' incorrect'
          }
        }
        return (
          <span key={index} className={className}>
            {currentTyping[index]}
          </span>
        )
      })}
    </div>
  )
}

export default Line

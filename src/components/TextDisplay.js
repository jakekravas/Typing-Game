import React from 'react'

const DisplayText = ({ displayText, userInput }) => {

  return (
    <div>
      {
        displayText.map((letter, i) => {
          let color;
          if (i < userInput.length) {
            color = letter === userInput[i] ? "#dfffa0": "#fcbea4";
          }
          return <span key={i} style={{backgroundColor: color}}>{letter}</span>
        })
      }
    </div>
  )
}

export default DisplayText

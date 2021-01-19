import React, { useEffect, useState } from 'react';
import words from '../data/words';

const Gamee = () => {
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [wordArr, setWordArr] = useState(words);
  const [correctWords, setCorrectWords] = useState([]);
  const [currentWord, setCurrentWord] = useState(words[Math.floor(Math.random() * words.length)]);
  const [userInput, setUserInput] = useState("");
  const [seconds, setSeconds] = useState(10);
  const [wordTotal, setWordTotal] = useState(0);

  useEffect(() => {
    if (finished) {
      // let calculateWpm = (correctWords.join("").length / 5).toFixed(1);
      // setWpm(calculateWpm);
    }
  }, [finished]);

  const handleUserInputChange = e => {

    if (!started) {
      setStarted(true);
      timer();
    }

    const val = e.target.value;
    setUserInput(val);

    if (val === currentWord) {
      setCorrectWords([...correctWords, currentWord]);
      const arr = wordArr;
      const index = wordArr.indexOf(currentWord);
      arr.splice(index, 1);
      setWordArr(arr);
      setCurrentWord(arr[Math.floor(Math.random() * arr.length)]);
      setUserInput("");
      setWordTotal(wordTotal + 1);
    }

  }

  const handleRestartClick = () => {
    setWordTotal(0);
    setUserInput("");
    setWordArr(words);
    setFinished(false);
    setSeconds(3);
    setCorrectWords([]);
  }

  const timer = () => {
    let s = seconds;
    const interval = setInterval(() => {
      s--;
      if (s === -1) {
        clearInterval(interval);
        setSeconds(0);
        setFinished(true);
        setStarted(false);
      } else {
        setSeconds(s);
      }
    }, 1000);
  };

  return (
    <div className="container text-center">
      <div>
        <p>Type whichever word appears below</p>
        <h2 id="current-word">{currentWord}</h2>
        {/* <TextDisplay displayText={displayText.split("")} userInput={userInput}/> */}
        <input
          type="text"
          name="userInput"
          className="form-control mx-auto"
          id="user-input"
          value={userInput}
          readOnly={finished}
          placeholder={!started ? "Start typing" : ""}
          onChange={handleUserInputChange}
        />
        <p onClick={() => console.log(correctWords)}>Time: {seconds}</p>
        <p>Score: {wordTotal}</p>
        {finished &&
          <div>
            <button className="ml-1" onClick={handleRestartClick}>
              <i className="fas fa-undo"/>
            </button>
          </div>
        }
      </div>
    </div>
  )
}

export default Gamee

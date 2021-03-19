import { useState } from 'react';

export default function useVisualMode (initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newValue, replace = false) =>  {
    // push new value into history array
    setHistory((prevHistory) => {
      let newHistory = [...prevHistory];
      if (replace) {
        newHistory[newHistory.length - 1] = newValue;
      } else {
        newHistory.push(newValue)
      }
      return newHistory;
    });

    setMode(newValue);
  };


  const back = () => {
    setHistory((prevHistory) => {
      if (prevHistory.length <= 1) {
        return prevHistory;
      } else {
      const lastHistory = prevHistory[prevHistory.length - 2]
      setMode(lastHistory)
      return  prevHistory.filter((item, index) => index !== (prevHistory.length - 1))
      }
    })
  }

  return { mode, transition, back};
}
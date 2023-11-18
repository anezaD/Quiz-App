import { useState, useEffect } from "react";

const QuestionTimer = ({ timeOut, onTimeOut }) => {
  //timeOut max time and onTimeOut value to notify when timer is done

  const [timeValue, setTimeValue] = useState(timeOut);
  useEffect(() => {
    const timer = setTimeout(onTimeOut, timeOut);
    // καθε timeout=10000 καλεσε την onTimeOut;
    console.log("setTimeout");
    return () => clearTimeout(timer);
    //Οταν αλλάξουν τα data ξανατρέξτο 
  }, [onTimeOut]);

  useEffect(() => {
    //The callback function will run after the component mounts
    const intervalId = setInterval(() => {
      setTimeValue(prevSeconds => prevSeconds - 100);
    }, 100);

    console.log("setInterval");
    //The return cleanup function will run when the component unmounts
    return () => clearInterval(intervalId);

  }, []);

  return (
    <div id="question">
      <progress max={timeOut} value={timeValue} />
    </div>
  )
}

export default QuestionTimer;
import {useState, useCallback} from 'react';
import Questions from '../Questions.js';
import QuizComplete from '../assets/quiz-complete.png';
import QuestionTimer from './QuestionTimer.jsx';

const Quiz = () => {

    const [userAnswers, setUserAnswers] = useState([]);
    const [style_] = useState({textAlign:'center'});
    const activeQuestion = userAnswers.length;

    //Use callBack Hook to ensure that this ffunction wont be recreated unless their dependencies change
    const selectedAnswerFunction = useCallback( function selectedAnswerFunction (selectedAnswer){
        setUserAnswers(prevAnswers => { return [...prevAnswers, selectedAnswer] })
        console.log("call Answer");
    }, []);

    const skipSelectedAnswerFunction = useCallback(() => selectedAnswerFunction(null), [selectedAnswerFunction]);
    //const reorderAnswers = Questions[activeQuestion].answers; //why the [...]
    if (activeQuestion === Questions.length) {
        return (
            <div id="summary">
                <img src={QuizComplete}></img>
                <h2>Quiz Completed!</h2>
            </div>
        );
    }
    
    const reorderAnswers = [...Questions[activeQuestion].answers].sort(()=>Math.random()-0.5);
    const timeOutVal = 10000;
    return (
        <div id="quiz">
            <div id="questions" >
                <QuestionTimer key={activeQuestion} timeOut={timeOutVal} onTimeOut={skipSelectedAnswerFunction} /> 
                {/* we added key so everytime this component is recreatedx */}
                <h2> {Questions[activeQuestion].text} </h2>
                <ul id="answers">
                    {reorderAnswers.map(answer => (
                        <li key={answer} className="answer">
                            <button onClick={()=>selectedAnswerFunction(answer)}>{answer}</button> 
                            {/* arrow function so not to call the function on render */}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Quiz;
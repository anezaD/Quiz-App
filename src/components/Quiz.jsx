import {useState} from 'react';
import Questions from '../Questions.js';
import QuizComplete from '../assets/quiz-complete.png';
import QuestionTimer from './QuestionTimer.jsx';

const Quiz = () => {

    const [userAnswers, setUserAnswers] = useState([]);
    const [style_] = useState({textAlign:'center'});
    const activeQuestion = userAnswers.length;
    const selectedAnswerFunction = (selectedAnswer) => {
        setUserAnswers((prevAnswers) => { return [...prevAnswers, selectedAnswer] })
    }

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

    return (
        <div id="quiz">
            <div id="questions" >
                <QuestionTimer/>
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
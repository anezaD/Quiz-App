import { useState, useCallback } from 'react';
import Questions from '../Questions.js';

import QuizComplete from '../assets/quiz-complete.png';
import QuestionTimer from './QuestionTimer.jsx';
import Answers from './Answers.jsx';

const Quiz = () => {

    const [userAnswers, setUserAnswers] = useState([]);
    const [style_] = useState({ textAlign: 'center' });
    const [answerState, setAnswerState] = useState('');
    const activeQuestion = (answerState === '' ? userAnswers.length : userAnswers.length - 1);
    const timeOutVal = 10000;

    //Use callBack Hook to ensure that this function wont be recreated unless their dependencies change
    const selectedAnswerFunction = useCallback(function selectedAnswerFunction(selectedAnswer) {
        console.log("selectedAnswer", selectedAnswer);
        setAnswerState("answered");
        setUserAnswers(prevAnswers => { return [...prevAnswers, selectedAnswer] });
        setTimeout(() => {
            if (selectedAnswer === Questions[activeQuestion].answers[0]) {
                setAnswerState("correct");
            } else {
                setAnswerState("wrong");
            }
            //After answer reset useState of answer status 
            setTimeout(() => {
                setAnswerState('');
            }, 2000);

        }, 1000);
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

    return (
        <div id="quiz">
            <div id="questions" >
                <QuestionTimer key={activeQuestion} timeOut={timeOutVal} onTimeOut={skipSelectedAnswerFunction} />
                {/* we added key so everytime this component is recreatedx */}
                <h2> {Questions[activeQuestion].text} </h2>

                <Answers
                    answers={Questions[activeQuestion].answers}
                    answerState={answerState} selectedAnswer={userAnswers[userAnswers.length - 1]}
                    onSelect={selectedAnswerFunction}
                    key={activeQuestion + 33.99}
                />
            </div>
        </div>
    )
}

export default Quiz;
import { useRef } from 'react'
import Questions from '../Questions.js';

export default function Answers({ answers, answerState, selectedAnswer, onSelect }) {
    const reorderAnswers = useRef(); // manage independently from the component lifecycle
    if (!reorderAnswers.current) { //We check if reorderAnswers are undifined
        reorderAnswers.current = [...answers].sort(() => Math.random() - 0.5);
    }
    return (
        <ul id="answers">
            {reorderAnswers.current.map(answer => {
                const isSelected = selectedAnswer === answer;
                let cssClass = ''
                if (isSelected && answerState === "answered") {
                    cssClass = "selected";
                }
                if (isSelected && (answerState === "correct" || answerState === "wrong")) {
                    cssClass = answerState;
                }
                return <li key={answer} className="answer">
                    <button onClick={() => onSelect(answer)} className={cssClass}> {answer} </button>
                    {/* arrow function so not to call the function on render */}
                </li>
            })}
        </ul>
    )
}

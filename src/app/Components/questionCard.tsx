'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { validateAnswer } from '../Actions/validateAnswer';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct_answer: string;
  hint: string;
}

interface Props {
  questions: Question[];
}

const QuestionCard = ({ questions }: Props) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleRefresh = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
  };

  const handleAnswer = async (selectedAnswer: string) => {
    const isCorrect = await validateAnswer(currentQuestion.id, selectedAnswer);

    if (isCorrect) {
      setScore(score + 10);
    }

    if (currentQuestionIndex < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowHint(false);
    }
  };
  const handleShowHint = () => {
    setShowHint(true);
    setScore(score - 5);
  };

  return (
    currentQuestionIndex  < questions.length?
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <h1 className="text-7xl text-orange-950 pb-4 font-serif font-bold">Quiz App</h1>
      <div className=" p-3 m-3 min-h-1/2 max-h-fit w-1/2 bg-indigo-950 rounded-3xl">
        <h3 className="pl-1 text-2xl pb-4 text-white font-serif">Question {currentQuestionIndex + 1}/{questions.length}   </h3>
        <p className="pl-1 text-4xl text-white font-serif">{currentQuestion.question}</p>

        {currentQuestion.options.map((option, index) => (
          <div className="flex justify-center" key={index}><button className=" font-mono flex justify-center items-center m-2 p-1 text-3xl w-11/12 bg-orange-600 hover:bg-rose-700 text-white font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" key={index} onClick={() => handleAnswer(option)}>
            {option}
          </button></div>
        ))}

        {!showHint && <div className="flex justify-center items-center"><button className=" font-serif m-1 p-3 text-3xl w-fit bg-teal-200 hover:bg-white text-sky-900 font-bold rounded flex justify-center items-center" onClick={handleShowHint} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>{isHovered? <span>-5 Pt</span> : <p>Hint</p>}</button></div>}
        {showHint && <div className="flex justify-center items-center"><div className="font-mono w-fit bg-violet-800 m-1 p-3 text-3xl rounded text-white">{currentQuestion.hint}</div></div>}
      </div>
    </div>
    :
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <h1 className="text-7xl text-orange-950 pb-4 font-serif font-bold">Quiz App</h1>
      <div className="p-3 m-3 h-1/2 w-1/2 bg-indigo-950 rounded-3xl">
        <div className="text-8xl flex justify-center items-center p-2 m-2 text-white font-serif">Your Score</div>
        <div className="text-6xl flex justify-center items-center p-2 m-2 text-white font-mono">{score} / {(questions.length)*10}</div>
        <div className="flex justify-center items-center"><button className="font-serif w-fit text-4xl bg-teal-200 hover:bg-white text-sky-900 font-bold p-4 mt-10 rounded" onClick={handleRefresh}>Restart</button></div>
      </div>
    </div>
  );
};

export default QuestionCard;
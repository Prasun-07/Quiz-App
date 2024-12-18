import fetchQuestions from './Actions/fetchQuestions';
import QuestionCard from './Components/questionCard';

export default async function Page() {
  const questions = await fetchQuestions();
  return (
    <div className="bg-orange-300">
      <QuestionCard questions={questions || []} />
    </div>
  );
}
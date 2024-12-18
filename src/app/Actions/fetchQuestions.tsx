import {supabase} from "../../../utils/supabase";

export default async function fetchQuestions(){
    const { data } = await supabase
      .from('Quiz')
      .select('id, question, option1, option2, option3, option4, correct_answer, hint');
  
    return data?.map((q) => ({
      id: q.id,
      question: q.question,
      options: [q.option1, q.option2, q.option3, q.option4],
      correct_answer: q.correct_answer,
      hint: q.hint,
    }));
  };
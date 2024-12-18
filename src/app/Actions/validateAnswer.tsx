import {supabase} from "../../../utils/supabase";

export const validateAnswer = async (questionId: number, answer: string) => {
    const { data } = await supabase
      .from('Quiz')
      .select('correct_answer')
      .eq('id', questionId)
      .single();
  
    return data?.correct_answer === answer;
};
  
import { Question, Subject, LearntQuestions } from 'validators/subjects';

type SubjectId = Subject['id'];
export type QuestionId = Question['id'];

type LearntQuestionsKey = `learnt-${string}`;

export const getLearntQuestionsLocalStorageKey = (
  subjectId: SubjectId,
): LearntQuestionsKey => `learnt-${subjectId}`;

export const getLearntQuestionsFromLocalStorage = (
  key: LearntQuestionsKey,
): LearntQuestions => {
  const questions = localStorage.getItem(key);

  if (!questions) {
    return [];
  }

  return JSON.parse(questions);
};

export const addLearntQuestionToLocalStorage = (
  key: LearntQuestionsKey,
  questionId: QuestionId,
) => {
  const currentQuestions = getLearntQuestionsFromLocalStorage(key);

  if (currentQuestions && !currentQuestions.includes(questionId)) {
    localStorage.setItem(
      key,
      JSON.stringify([...currentQuestions, questionId]),
    );
  }
};

export const removeLearntQuestionFromLocalStorage = (
  key: LearntQuestionsKey,
  questionId: QuestionId,
) => {
  const currentQuestions = getLearntQuestionsFromLocalStorage(key);

  if (currentQuestions && currentQuestions.includes(questionId)) {
    localStorage.setItem(
      key,
      JSON.stringify(currentQuestions.filter((id) => id !== questionId)),
    );
  }
};

import type { Vocab } from "../types/vocabTypes";

export const useFlashcardProgress = (vocabList: Vocab[]) => {
  const total = vocabList.length;
  const learned = vocabList.filter((v) => v.isLearned).length;
  const percent = total > 0 ? (learned / total) * 100 : 0;

  return { total, learned, percent };
};

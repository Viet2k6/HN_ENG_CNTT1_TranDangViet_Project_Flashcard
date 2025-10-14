import { useDispatch } from "react-redux";
import { markAsLearned } from "../slices/vocabSlice";
import type { Vocab } from "../types/vocabTypes";
import type { AppDispatch } from "../stores";

export const useFlashcardLearn = (
  vocabList: Vocab[],
  currentWord: Vocab | null,
  setVocabulary: (list: Vocab[]) => void
) => {
  const dispatch = useDispatch<AppDispatch>();

  const markAsLearnedHandler = async () => {
    if (!currentWord || currentWord.isLearned) return;

    const result = await dispatch(markAsLearned(currentWord.id));
    if (markAsLearned.fulfilled.match(result)) {
      const updated = result.payload;
      const updatedList = vocabList.map((v) =>
        v.id === updated.id ? updated : v
      );
      setVocabulary(updatedList);
    }
  };

  return { markAsLearned: markAsLearnedHandler };
};

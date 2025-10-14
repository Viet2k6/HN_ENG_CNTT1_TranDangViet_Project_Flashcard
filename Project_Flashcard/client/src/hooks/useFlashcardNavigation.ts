import { useState, useEffect } from "react";
import type { Vocab } from "../types/vocabTypes";

export const useFlashcardNavigation = (vocabList: Vocab[]) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    setCurrentIndex(0);
  }, [vocabList]);

  useEffect(() => {
    if (currentIndex >= vocabList.length) {
      setCurrentIndex(0);
    }
  }, [currentIndex, vocabList.length]);

  const currentWord = vocabList.length > 0 ? vocabList[currentIndex] : null;

  const nextCard = () => {
    if (vocabList.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % vocabList.length);
  };

  const previousCard = () => {
    if (vocabList.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + vocabList.length) % vocabList.length);
  };

  return { currentIndex, currentWord, nextCard, previousCard };
};

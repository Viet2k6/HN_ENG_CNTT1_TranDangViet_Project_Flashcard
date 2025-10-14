import { useState } from "react";

export const useFlashcardFlip = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const flipCard = () => setIsFlipped((prev) => !prev);
  const resetFlip = () => setIsFlipped(false);

  return { isFlipped, flipCard, resetFlip };
};

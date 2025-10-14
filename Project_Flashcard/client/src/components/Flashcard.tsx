import type { Vocab } from "../types/vocabTypes";


interface Props {
  word: Vocab | null;
  isFlipped: boolean;
  onFlip: () => void;
}

export const Flashcard = ({ word, isFlipped, onFlip }: Props) => {
  if (!word) {
    return (
      <div className="flashcard mb-6 w-[672px] h-[300px] mx-auto flex items-center justify-center bg-gray-200 rounded-xl shadow-inner">
        <p className="text-gray-600 text-lg">No word available</p>
      </div>
    );
  }

  return (
    <div
      className={`flashcard mb-6 cursor-pointer ${isFlipped ? "flipped" : ""}`}
      onClick={onFlip}
    >
      <div className="flashcard-inner w-[672px] h-[300px] mx-auto relative transition-transform duration-500 transform-style-preserve-3d">
        <div className="flashcard-front absolute w-full h-full bg-white rounded-xl shadow-xl flex items-center justify-center backface-hidden">
          <h2 className="text-3xl font-bold text-center">{word.word}</h2>
        </div>
        <div className="flashcard-back absolute w-full h-full bg-gray-50 rounded-xl shadow-xl flex items-center justify-center backface-hidden transform rotate-y-180">
          <h2 className="text-3xl font-bold text-center">{word.meaning}</h2>
        </div>
      </div>
    </div>
  );
};


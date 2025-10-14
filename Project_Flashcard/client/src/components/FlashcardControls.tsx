interface Props {
  onNext: () => void;
  onPrev: () => void;
  onLearn: () => void;
  isLearned: boolean;
}

export const FlashcardControls = ({
  onNext,
  onPrev,
  onLearn,
  isLearned,
}: Props) => {
  return (
    <div className="flex justify-center space-x-4 mt-4">
      <button
        onClick={onPrev}
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
      >
        Previous
      </button>

      <button
        onClick={onLearn}
        disabled={isLearned}
        className={`px-6 py-2 rounded text-white ${
          isLearned
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-[#20c25d] hover:bg-green-600"
        }`}
      >
        {isLearned ? "Already Learned" : "Mark as Learned"}
      </button>

      <button
        onClick={onNext}
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
      >
        Next
      </button>
    </div>
  );
};

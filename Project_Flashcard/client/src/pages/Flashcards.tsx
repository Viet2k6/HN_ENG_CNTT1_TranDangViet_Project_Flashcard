import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "antd";
import { CategoryFilter } from "../components/CategoryFilter";
import { Flashcard } from "../components/Flashcard";
import { FlashcardControls } from "../components/FlashcardControls";
import { FlashcardProgress } from "../components/FlashcardProgress";
import { WordList } from "../components/WordList";
import { Footer } from "../components/Footer";
import { SuccessModal } from "../components/SuccessModal"; // ✅ Import modal
import { useFlashcardData } from "../hooks/useFlashcardData";
import { useFlashcardFlip } from "../hooks/useFlashcardFlip";
import { useFlashcardLearn } from "../hooks/useFlashcardLearn";
import { usePaginated } from "../hooks/usePaginated";
import { getAllVocabsByCategory } from "../slices/vocabSlice";
import type { RootState, AppDispatch } from "../stores";
import type { Vocab } from "../types/vocabTypes";

const useFlashcardNavigation = (vocabList: Vocab[], index: number) => {
  const currentWord = vocabList.length > 0 ? vocabList[index] : null;
  return { currentWord };
};

export const Flashcards = () => {
  const {
    categories,
    currentCategory,
    setCurrentCategory,
    setVocabulary,
  } = useFlashcardData();

  const dispatch = useDispatch<AppDispatch>();
  const fullVocabulary = useSelector(
    (state: RootState) => state.vocabs.fullList
  );

  const [orderedVocabs, setOrderedVocabs] = useState<Vocab[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCompleteModal, setShowCompleteModal] = useState(false);

  const {
    vocabs: paginatedWords,
    total,
    page: wordPage,
    setPage: setWordPage,
    itemsPerPage: wordsPerPage,
  } = usePaginated({
    categoryId: currentCategory,
  });

  useEffect(() => {
    dispatch(getAllVocabsByCategory(currentCategory));
    setCurrentIndex(0);
  }, [currentCategory, dispatch]);

  useEffect(() => {
    if (fullVocabulary.length > 0) {
      const sorted = [...fullVocabulary].sort((a, b) => b.id - a.id);
      setOrderedVocabs(sorted);
    }
  }, [fullVocabulary]);

  useEffect(() => {
    if (orderedVocabs.length > 0) {
      const allLearned = orderedVocabs.every((v) => v.isLearned);
      setShowCompleteModal(allLearned);
    }
  }, [orderedVocabs]);

  const { currentWord } = useFlashcardNavigation(orderedVocabs, currentIndex);
  const { isFlipped, flipCard, resetFlip } = useFlashcardFlip();
  const { markAsLearned } = useFlashcardLearn(
    orderedVocabs,
    currentWord,
    setVocabulary
  );

  const totalWords = orderedVocabs.length;
  const learned = orderedVocabs.filter((v) => v.isLearned).length;
  const percent =
    totalWords > 0 ? Math.round((learned / totalWords) * 100) : 0;

  const hasWords = orderedVocabs.length > 0 && currentWord;

  const nextCard = () => {
    if (orderedVocabs.length === 0) return;
    setCurrentIndex((prev) =>
      prev + 1 < orderedVocabs.length ? prev + 1 : 0
    );
    resetFlip();
  };

  const previousCard = () => {
    if (orderedVocabs.length === 0) return;
    setCurrentIndex((prev) =>
      prev - 1 >= 0 ? prev - 1 : orderedVocabs.length - 1
    );
    resetFlip();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Flashcard Learning</h1>
        </div>

        <CategoryFilter
          categories={categories}
          selected={currentCategory}
          onChange={(id) => {
            setCurrentCategory(id);
            setWordPage(1);
            setCurrentIndex(0);
            resetFlip();
          }}
        />

        <div className="max-w-2xl mx-auto">
          {hasWords ? (
            <>
              <Flashcard
                word={currentWord}
                isFlipped={isFlipped}
                onFlip={flipCard}
              />

              <FlashcardControls
                onNext={nextCard}
                onPrev={previousCard}
                onLearn={markAsLearned}
                isLearned={currentWord.isLearned}
              />

              <FlashcardProgress
                total={totalWords}
                learned={learned}
                percent={percent}
              />
            </>
          ) : (
            <div className="text-center text-gray-500 py-12">
              No words available in this category.
            </div>
          )}
        </div>

        <WordList
          words={paginatedWords}
          renderStatus={(word) => (
            <span
              className={`text-sm font-medium ${
                word.isLearned ? "text-green-600" : "text-black"
              }`}
            >
              {word.isLearned ? "Learned" : "Not Learned"}
            </span>
          )}
        />

        {total > 0 && (
          <div className="flex justify-center mt-4">
            <Pagination
              current={wordPage}
              pageSize={wordsPerPage}
              total={total}
              onChange={(page) => {
                setWordPage(page);
                resetFlip();
              }}
              showSizeChanger={false}
            />
          </div>
        )}
      </main>

      <Footer />

      {showCompleteModal && (
        <SuccessModal
          title="Hoàn thành! Bạn đã học xong tất cả từ vựng."
          onClose={() => setShowCompleteModal(false)}
        />
      )}
    </div>
  );
};

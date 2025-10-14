interface Props {
  total: number;
  learned: number;
  percent: number;
}

export const FlashcardProgress = ({ total, learned, percent }: Props) => {
  return (
    <div className="mt-8">
      <div className="flex justify-between mb-2">
        <span>Progress</span>
        <span>{learned}/{total}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </div>
  );
};

import type { Vocab } from "../types/vocabTypes";

interface Props {
  words: Vocab[];
  renderStatus?: (word: Vocab) => React.ReactNode;
}

export const WordList = ({ words, renderStatus }: Props) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Word List</h2>
      <div className="bg-[#f9fafc] rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Word
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Meaning
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white ">
            {words.map((word) => (
              <tr key={word.id}>
                <td className="px-6 py-4 text-sm text-gray-900">{word.word}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{word.meaning}</td>
                <td className="px-6 py-4 text-sm">
                  {renderStatus ? (
                    renderStatus(word)
                  ) : word.isLearned ? (
                    <span className="text-green-600 font-medium">Learned</span>
                  ) : (
                    <span className="text-gray-600 font-medium">Not Learned</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

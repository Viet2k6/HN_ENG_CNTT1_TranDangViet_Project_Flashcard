import type { Vocab } from "../types/vocabTypes";
import { useSelector } from "react-redux";
import type { RootState } from "../stores";

interface Props {
  vocabs: Vocab[];
  onEdit: (vocab: Vocab) => void;
  onDelete: (id: number) => void;
}

export const VocabTable = ({ vocabs, onEdit, onDelete }: Props) => {
  const categories = useSelector((state: RootState) => state.categories.list);

  const getCategoryName = (id: number) => {
    const cat = categories.find((c) => c.id === id);
    return cat ? cat.name : "Uncategorized";
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Word</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Meaning</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody>
          {vocabs.map((vocab) => (
            <tr key={vocab.id}>
              <td className="px-6 py-4">{vocab.word}</td>
              <td className="px-6 py-4">{vocab.meaning}</td>
              <td className="px-6 py-4">{getCategoryName(vocab.categoryId)}</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => onEdit(vocab)}
                  className="text-blue-600 hover:text-blue-900 mr-3"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(vocab.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

import type { Category } from "../types/categoryTypes";

interface Props {
  categories: Category[];
  onDelete: (id: number) => void;
  onEdit: (category: Category) => void;
}


export const CategoryTable = ({ categories, onDelete, onEdit }: Props) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td className="px-6 py-4">{category.name}</td>
              <td className="px-6 py-4">{category.description}</td>
              <td className="px-6 py-4 space-x-4">
                <button
                  onClick={() => onEdit(category)}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(category.id)}
                  className="text-red-500 hover:underline"
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

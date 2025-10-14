import type { Category } from "../types/categoryTypes";

interface Props {
  categories: Category[];
  selected: number | null;
  onChange: (id: number | null) => void;
}

export const CategoryFilter = ({ categories, selected, onChange }: Props) => {
  return (
    <div className="mb-4">
      <select
        value={selected ?? ""}
        onChange={(e) =>
          onChange(e.target.value ? parseInt(e.target.value) : null)
        }
        className="w-full px-4 py-2  rounded bg-white"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
    </div>
  );
};

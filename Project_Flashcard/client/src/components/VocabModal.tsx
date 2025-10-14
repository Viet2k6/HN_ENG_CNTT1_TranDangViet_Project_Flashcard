import { useState, useEffect } from "react";
import type { VocabFormData, Vocab } from "../types/vocabTypes";
import { useSelector } from "react-redux";
import type { RootState } from "../stores";

interface Props {
  initialData?: Vocab;
  onClose: () => void;
  onSave: (data: VocabFormData) => void;
}

export const VocabModal = ({ initialData, onClose, onSave }: Props) => {
  const categories = useSelector((state: RootState) => state.categories.list);

  const [formData, setFormData] = useState<VocabFormData>({
    word: "",
    meaning: "",
    categoryId: 0,
    isLearned: false,
  });

  const [errors, setErrors] = useState({
    word: "",
    meaning: "",
    categoryId: "",
  });

  useEffect(() => {
    if (initialData) {
      const { word, meaning, categoryId, isLearned } = initialData;
      setFormData({ word, meaning, categoryId, isLearned });
    }
  }, [initialData]);

  const handleChange = (field: keyof VocabFormData, value: string | number | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (field in errors) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = () => {
    const newErrors = {
      word: formData.word.trim() ? "" : "Word is required",
      meaning: formData.meaning.trim() ? "" : "Meaning is required",
      categoryId: formData.categoryId ? "" : "Category is required",
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((msg) => msg !== "");
    if (hasError) return;

    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-4">
          {initialData ? "Edit Word" : "Add New Word"}
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Word</label>
          <input
            type="text"
            value={formData.word}
            onChange={(e) => handleChange("word", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
          {errors.word && <p className="text-red-500 text-sm mt-1">{errors.word}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Meaning</label>
          <textarea
            value={formData.meaning}
            onChange={(e) => handleChange("meaning", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            rows={3}
          />
          {errors.meaning && <p className="text-red-500 text-sm mt-1">{errors.meaning}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            value={formData.categoryId}
            onChange={(e) => handleChange("categoryId", Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.categoryId && <p className="text-red-500 text-sm mt-1">{errors.categoryId}</p>}
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

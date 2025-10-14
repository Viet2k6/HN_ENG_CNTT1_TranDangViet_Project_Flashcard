import { useCategoryForm } from "../hooks/useCategoryForm";
import type { CategoryFormData, Category } from "../types/categoryTypes";
import type { SubmitHandler } from "react-hook-form";

interface Props {
  initialData?: Category;
  onClose: () => void;
  onSave: (data: CategoryFormData) => void;
}

export const CategoryModal = ({ initialData, onClose, onSave }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useCategoryForm(initialData);

  const handleFormSubmit: SubmitHandler<CategoryFormData> = (data) => {
    onSave(data); 
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">
          {initialData ? "Edit Category" : "Add new category"}
        </h2>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              {...register("name", { required: "Name is required" })}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              {...register("description")}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {initialData ? "Save" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  searchCategories,
} from "../slices/categorySlice";
import { CategoryTable } from "../components/CategoryTable";
import { CategoryModal } from "../components/CategoryModal";
import { DeleteModal } from "../components/DeleteModal";
import type { Category, CategoryFormData } from "../types/categoryTypes";
import type { RootState, AppDispatch } from "../stores";
import { Footer } from "../components/Footer";
import { Pagination } from "antd"; 

export const Categories = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list: categories, loading, error } = useSelector(
    (state: RootState) => state.categories
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      dispatch(searchCategories(searchTerm));
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, dispatch]);

  const handleAdd = () => {
    setSelectedCategory(null);
    setShowModal(true);
  };

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setShowModal(true);
  };

  const handleSave = (data: CategoryFormData) => {
    if (selectedCategory) {
      dispatch(updateCategory({ id: selectedCategory.id, data }));
    } else {
      dispatch(createCategory(data));
    }
    setShowModal(false);
    setSelectedCategory(null);
  };

  const handleDelete = (id: number) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (deleteId !== null) {
      dispatch(deleteCategory(deleteId));
      setDeleteId(null);
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Vocabulary Categories</h1>
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Add new category
          </button>
        </div>

        <div className="mb-4">
          <input
            type="text"
            id="categorySearch"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded bg-white"
            placeholder="Search categories..."
          />
        </div>

        {loading && <p className="text-gray-500">Loading categories...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        <CategoryTable
          categories={categories}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />

        {/* ✅ Giao diện phân trang Ant Design */}
        <div className="mt-8 flex justify-center">
          <Pagination
            current={currentPage}
            total={50}         // Tổng số danh mục giả định
            pageSize={10}      // Số danh mục mỗi trang
            showSizeChanger={false}
            onChange={(page) => setCurrentPage(page)}
          />
        </div>

        {showModal && (
          <CategoryModal
            initialData={selectedCategory || undefined}
            onClose={() => {
              setShowModal(false);
              setSelectedCategory(null);
            }}
            onSave={handleSave}
          />
        )}

        {showDeleteModal && (
          <DeleteModal
            title="Delete Category"
            message="Are you sure you want to delete this category?"
            onConfirm={confirmDelete}
            onCancel={() => {
              setShowDeleteModal(false);
              setDeleteId(null);
            }}
          />
        )}
      </main>
      <Footer />
    </div>
  );
};

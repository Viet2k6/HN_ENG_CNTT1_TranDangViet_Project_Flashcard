import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getVocabs,
  createVocab,
  updateVocab,
  deleteVocab,
  searchVocabs,
  filterVocabs,
} from "../slices/vocabSlice";
import { getCategories } from "../slices/categorySlice";
import { VocabTable } from "../components/VocabTable";
import { VocabModal } from "../components/VocabModal";
import { DeleteModal } from "../components/DeleteModal";
import type { Vocab, VocabFormData } from "../types/vocabTypes";
import type { RootState, AppDispatch } from "../stores";
import { Footer } from "../components/Footer";

export const Vocabs = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list: vocabs, loading, error } = useSelector(
    (state: RootState) => state.vocabs
  );
  const categories = useSelector((state: RootState) => state.categories.list);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedVocab, setSelectedVocab] = useState<Vocab | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(getVocabs());
    dispatch(getCategories());
  }, [dispatch]);


  useEffect(() => {
    const delay = setTimeout(() => {
      const trimmed = searchTerm.trim();
      if (trimmed) {
        dispatch(
          searchVocabs({
            searchTerm: trimmed,
            categoryId: selectedCategory ? selectedCategory : undefined,
          })
        );
      } else if (selectedCategory) {
        dispatch(filterVocabs(Number(selectedCategory)));
      } else {
        dispatch(getVocabs());
      }
    }, 400);

    return () => clearTimeout(delay);
  }, [searchTerm, selectedCategory, dispatch]);

 
  useEffect(() => {
    if (!searchTerm.trim()) {
      if (selectedCategory) {
        dispatch(filterVocabs(Number(selectedCategory)));
      } else {
        dispatch(getVocabs());
      }
    }
  }, [selectedCategory, searchTerm, dispatch]);


  const handleAdd = () => {
    setSelectedVocab(null);
    setShowModal(true);
  };

 
  const handleEdit = (vocab: Vocab) => {
    setSelectedVocab(vocab);
    setShowModal(true);
  };

  
  const handleSave = (data: VocabFormData) => {
    const refresh = () => {
      const trimmed = searchTerm.trim();
      if (trimmed) {
        dispatch(
          searchVocabs({
            searchTerm: trimmed,
            categoryId: selectedCategory ? selectedCategory : undefined,
          })
        );
      } else if (selectedCategory) {
        dispatch(filterVocabs(Number(selectedCategory)));
      } else {
        dispatch(getVocabs());
      }
    };

    if (selectedVocab) {
      dispatch(updateVocab({ id: selectedVocab.id, data })).then(refresh);
    } else {
      dispatch(createVocab(data)).then(refresh);
    }

    setShowModal(false);
    setSelectedVocab(null);
  };

 
  const handleDelete = (id: number) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (deleteId !== null) {
      dispatch(deleteVocab(deleteId)).then(() => {
        const trimmed = searchTerm.trim();
        if (trimmed) {
          dispatch(
            searchVocabs({
              searchTerm: trimmed,
              categoryId: selectedCategory ? selectedCategory : undefined,
            })
          );
        } else if (selectedCategory) {
          dispatch(filterVocabs(Number(selectedCategory)));
        } else {
          dispatch(getVocabs());
        }
      });
      setDeleteId(null);
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Vocabulary Words</h1>
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Add New Word
          </button>
        </div>

        <div className="mb-6 flex flex-col space-y-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-2 rounded bg-white"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded bg-white"
            placeholder="Search vocabulary..."
          />
        </div>

        {loading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        <VocabTable
          vocabs={vocabs}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {showModal && (
          <VocabModal
            initialData={selectedVocab || undefined}
            onClose={() => {
              setShowModal(false);
              setSelectedVocab(null);
            }}
            onSave={handleSave}
          />
        )}

        {showDeleteModal && (
          <DeleteModal
            title="Delete Word"
            message="Are you sure you want to delete this word?"
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

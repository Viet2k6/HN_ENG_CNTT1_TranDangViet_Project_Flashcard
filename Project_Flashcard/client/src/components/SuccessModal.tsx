interface SuccessModalProps {
  title?: string; 
  onClose: () => void;
}

export const SuccessModal = ({ title = "Thành công", onClose }: SuccessModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center">
        <h2 className="text-xl font-bold text-green-600 mb-4">{title}</h2>
        <button
          onClick={onClose}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Đóng
        </button>
      </div>
    </div>
  );
};

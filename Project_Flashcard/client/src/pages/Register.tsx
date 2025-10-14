import { useState } from "react";
import { SuccessModal } from "../components/SuccessModal"; 
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../stores";
import { registerUserThunk } from "../slices/authSlice";
import { FormRegister } from "../components/FormRegister";
import type { RegisterFormData } from "../types/authTypes";



export const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [showModal, setShowModal] = useState(false); 

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await dispatch(registerUserThunk(data)).unwrap();
      setShowModal(true); 
    } catch (error) {
      console.error("Đăng ký thất bại:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <FormRegister onSubmit={onSubmit} />
      </main>

      {showModal && (
        <SuccessModal
          title="Register successful!"
          onClose={() => {
            setShowModal(false);
            navigate("/");
          }}
        />
      )}
    </div>
    
  );
};

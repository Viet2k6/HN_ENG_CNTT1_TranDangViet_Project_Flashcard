import { useState } from "react";
import { SuccessModal } from "../components/SuccessModal"; 
import { FormLogin } from "../components/FormLogin";
import { useDispatch, useSelector } from "react-redux";
import { loginUserThunk } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { saveUserToLocalStorage } from "../utils/localStorage";
import type { LoginFormData } from "../types/authTypes";
import type { RootState, AppDispatch } from "../stores";

interface LoginProps {
  onLogin: () => void;
}

export const Login = ({ onLogin }: LoginProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { error } = useSelector((state: RootState) => state.auth);
  const [showModal, setShowModal] = useState(false); 

  const handleLogin = async (data: LoginFormData) => {
    const result = await dispatch(loginUserThunk(data));
    if (loginUserThunk.fulfilled.match(result)) {
      saveUserToLocalStorage(result.payload);
      setShowModal(true); 
      onLogin();
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <FormLogin onSubmit={handleLogin}  error={error} />
      </main>

      {showModal && (
        <SuccessModal
          title="Login successful!"
          onClose={() => {
            setShowModal(false);
            navigate("/"); 
          }}
        />
      )}
    </div>
  );
};

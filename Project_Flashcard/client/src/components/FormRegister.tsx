import { useRegisterForm } from "../hooks/useRegisterForm";
import type { RegisterFormData } from "../types/authTypes";
import { isValidEmail, isStrongPassword, isPasswordMatch } from "../utils/validation";

interface Props {
  onSubmit: (data: RegisterFormData) => void;
}

export const FormRegister = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useRegisterForm();

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">First Name</label>
          <input
            {...register("firstName", { required: "Name is required" })}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm">{errors.firstName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Last Name</label>
          <input
            {...register("lastName", { required: "Last name is required" })}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm">{errors.lastName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            {...register("email", {
              required: "Email is required",
              validate: (value) =>
                isValidEmail(value) || "Email is not in correct format",
            })}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              validate: (value) =>
                isStrongPassword(value) || "Password must be at least 8 characters",
            })}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Confirm Password</label>
          <input
            type="password"
            {...register("confirmPassword", {
              required: "Confirm password is required",
              validate: (value) =>
                isPasswordMatch(getValues("password"), value) ||
                "Confirm password doesn't match",
            })}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Register
        </button>
      </form>
    </div>
  );
};

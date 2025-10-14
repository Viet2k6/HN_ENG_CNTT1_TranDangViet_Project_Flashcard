import { useLoginForm } from "../hooks/useLoginForm";
import type { LoginFormData } from "../types/authTypes";
import { isValidEmail } from "../utils/validation";

interface Props {
  onSubmit: (data: LoginFormData) => void;
  error?: string | null;
}

export const FormLogin = ({ onSubmit, error }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useLoginForm();

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            {...register("email", {
              required: "Email is required",
              validate: (value) =>
                isValidEmail(value) || "Email is not in correct format",
            })}
            className={`w-full px-3 py-2 border rounded ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            {...register("password", {
              required: "Password is required",
            })}
            className={`w-full px-3 py-2 border rounded ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}

        <button
          type="submit"
          className="w-full py-2 rounded text-white font-semibold bg-blue-500 hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

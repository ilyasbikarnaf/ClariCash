import { FieldErrors, UseFormRegister } from "react-hook-form";

type FormInputProps = {
  labelText: string;
  type: "email" | "password" | "confirmPassword";
  errors: FieldErrors<{
    email: string;
    password: string;
    confirmPassword: string;
  }>;
  register: UseFormRegister<{
    email: string;
    password: string;
    confirmPassword?: string;
  }>;
};
export default function FormInput({
  register,
  labelText,
  type,
  errors,
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-2 ">
      <label htmlFor={type} className="opacity text-md ml-1">
        {labelText}
      </label>
      <input
        {...register(type)}
        type={type === "confirmPassword" ? "password" : type}
        name={type}
        id={type}
        className="h-10 w-full rounded-[8px] border border-gray-300/10 bg-[#222222] px-3 py-2 text-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 "
      />

      {errors[type] && (
        <p className="text-red-500 text-sm">{errors[type].message}</p>
      )}
    </div>
  );
}

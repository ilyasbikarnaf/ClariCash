import { UseFormRegister, FieldErrors } from "react-hook-form";

interface FormInputProps {
  labelText: string;
  type: string;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  name?: string; // Make sure this prop exists
}

export default function FormInput({
  labelText,
  type,
  register,
  errors,
  name, // Destructure name
}: FormInputProps) {
  // If name is provided, use it. Otherwise fallback to labelText (risky!)
  const registrationName = name || labelText;

  return (
    <div className="flex flex-col gap-2">
      <label className="text-white">{labelText}</label>
      <input
        type={type}
        // This links the input to React Hook Form
        {...register(registrationName)}
        className="p-2 rounded bg-[#333] text-white border border-[#444]"
      />

      {/* Dynamic Error Message Display */}
      {errors[registrationName] && (
        <span className="text-red-500 text-sm">
          {errors[registrationName]?.message as string}
        </span>
      )}
    </div>
  );
}

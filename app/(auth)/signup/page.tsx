"use client";

import { signup } from "@/app/actions/auth";
import FormInput from "@/components/FormInput";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { SignupSchema } from "@/lib/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { startTransition, useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const initialState = {
  success: false,
  message: "",
};

export default function Signup() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignupSchema),
    mode: "onBlur", // Optional: validates fields when you leave them
  });

  const [state, formAction, isPending] = useActionState(signup, initialState);

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success(state.message);
        router.refresh();
        router.replace("/");
      } else {
        toast.error(state.message);
      }
    }
  }, [state, router]);

  const onSubmit = async (data: z.output<typeof SignupSchema>) => {
    // Debugging: If this log appears, validation passed. If not, check form fields.
    console.log("Submitting form data:", data);

    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);

    startTransition(() => {
      formAction(formData);
    });
  };

  // Debugging: Monitor errors to see why onSubmit might be blocked
  console.log("Form Errors:", errors);

  return (
    <div className="flex flex-col md:justify-center mt-10 min-h-screen sm:px-6 lg:px-8">
      <div className="space-y-2 mb-10">
        <h1 className="text-center text-3xl">ClariCash</h1>
        <h6 className="text-lg font-semibold text-center tracking-widest uppercase">
          Create Account
        </h6>
      </div>

      <form
        className="flex flex-col sm:mx-auto sm:max-w-md sm:w-full bg-[#1A1A1A] p-8 border-1 border-[#444444]/30 rounded space-y-7"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormInput
          name="email" // EXPLICIT NAME MATCHING ZOD SCHEMA
          type="email"
          errors={errors}
          register={register}
          labelText="Email"
        />

        <FormInput
          name="password" // EXPLICIT NAME MATCHING ZOD SCHEMA
          type="password"
          errors={errors}
          register={register}
          labelText="Password"
        />

        <FormInput
          name="confirmPassword" // CRITICAL FIX: Explicitly maps to Zod's confirmPassword
          type="password" // CRITICAL FIX: Correct HTML input type
          errors={errors}
          register={register}
          labelText="Confirm Password"
        />

        <button
          disabled={isPending}
          type="submit"
          className={clsx(
            "hover:cursor-pointer bg-purple-500 p-2 rounded-2xl disabled:cursor-not-allowed disabled:opacity-75 transition-all w-full", // Added w-full for better UX
            isPending && "flex justify-center gap-2 items-center",
          )}
        >
          {isPending ? (
            <>
              <LoadingSpinner />
              Creating Account...
            </>
          ) : (
            "Sign up"
          )}
        </button>

        <p className="text-white/50 text-center">
          Already have an account? &nbsp;
          <Link className="text-white hover:underline" href="/signin">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}

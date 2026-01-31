"use client";

import { signin } from "@/app/actions/auth";
import FormInput from "@/components/FormInput";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { SigninSchema } from "@/lib/zodSchemas";
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

export default function Signin() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SigninSchema),
  });

  // 1. Pass the Server Action directly to useActionState
  const [state, formAction, isPending] = useActionState(signin, initialState);

  // 2. Handle Side Effects (Toast & Redirect) in useEffect
  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success(state.message);
        router.refresh(); // Ensure server components update with new cookie
        router.replace("/");
      } else {
        toast.error(state.message);
      }
    }
  }, [state, router]);

  function onSubmit(data: z.output<typeof SigninSchema>) {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    startTransition(() => {
      formAction(formData);
    });
  }

  return (
    <div className="flex flex-col md:justify-center mt-10 min-h-screen sm:px-6 lg:px-8">
      <div className="space-y-2 mb-10">
        <h1 className="text-center text-3xl">ClariCash</h1>
        <h6 className="text-lg font-semibold text-center tracking-widest uppercase">
          Visualize. Budget. Succeed
        </h6>
      </div>

      <form
        className="flex flex-col sm:mx-auto sm:max-w-md sm:w-full bg-[#1A1A1A] p-8 border-1 border-[#444444]/30 rounded space-y-7"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormInput
          errors={errors}
          labelText="Email"
          register={register}
          type="email"
        />

        <FormInput
          errors={errors}
          labelText="Password"
          register={register}
          type="password"
        />

        <button
          disabled={isPending}
          type="submit"
          className={clsx(
            "hover:cursor-pointer bg-purple-500 p-2 rounded-2xl disabled:cursor-not-allowed disabled:opacity-75 transition-all",
            isPending && "flex justify-center gap-2",
          )}
        >
          {isPending ? (
            <>
              <LoadingSpinner />
              Loading...
            </>
          ) : (
            "Sign in"
          )}
        </button>

        <p className="text-white/50 text-center">
          Don't have an account? &nbsp;
          <Link className="text-white hover:underline" href="/signup">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}

"use client";

import { signin } from "@/app/actions/auth";
import FormInput from "@/components/FormInput";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { SigninSchema } from "@/lib/zodAuthSchema";
// import { useSignIn } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { startTransition, useActionState, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const initialState = {
  success: false,
  message: "",
};

export default function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SigninSchema),
  });

  const router = useRouter();

  const [state, formAction, isPending] = useActionState(
    async (prevData, formData: FormData) => {
      try {
        const result = await signin(formData);

        if (!result.success) {
          toast.error(result.message);
          return null;
        }

        toast.success(result.message);
        router.push("/");
      } catch (err) {
        console.log(err);
        toast.error("An unexpected error occured");
        return null;
      }
    },
    initialState
  );

  function onSubmit(data: z.output<typeof SigninSchema>) {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    startTransition(async () => {
      formAction(formData);
    });
  }

  return (
    <div className="flex flex-col md:justify-center mt-10 min-h-screen  sm:px-6 lg:px-8 ">
      <div className="space-y-2 mb-10">
        <h1 className="text-center text-3xl">FocusFlow</h1>
        <h6 className="text-lg font-semibold text-center tracking-widest uppercase">
          Plan. Track. Win.
        </h6>
      </div>

      <form
        className="flex flex-col sm:mx-auto sm:max-w-md sm:w-full bg-[#1A1A1A] p-8 border-1 border-[#444444]/30   rounded space-y-7"
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
            "hover:cursor-pointer bg-blue-500 p-2 rounded-md disabled:cursor-not-allowed disabled:opacity-75",
            isPending && "flex  justify-center gap-2 bg"
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
          <Link className="text-white" href="/signup">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}

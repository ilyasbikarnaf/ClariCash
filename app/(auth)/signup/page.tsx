"use client";

import { signup } from "@/app/actions/auth";
import FormInput from "@/components/FormInput";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { SignupSchema } from "@/lib/zodAuthSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { startTransition, useActionState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const initialState = {
  success: false,
  message: "",
};

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignupSchema),
  });

  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, formAction, isPending] = useActionState(
    async (prevData, data: FormData) => {
      try {
        const result = await signup(data);

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

  const onSubmit = async (data: z.output<typeof SignupSchema>) => {
    const formData = new FormData();

    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);

    startTransition(() => {
      formAction(formData);
    });
  };

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
          type="email"
          errors={errors}
          register={register}
          labelText="Email"
        />
        <FormInput
          type="password"
          errors={errors}
          register={register}
          labelText="Password"
        />
        <FormInput
          type="confirmPassword"
          errors={errors}
          register={register}
          labelText="Confirm Password"
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
            "Sign up"
          )}
        </button>
        <p className="text-white/50 text-center">
          Already have an account? &nbsp;
          <Link className="text-white" href="/signin">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}

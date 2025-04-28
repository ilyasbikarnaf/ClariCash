import { z } from "zod";

export const SignupSchema = z
  .object({
    email: z
      .string()
      .email()
      .refine((val) => !val.includes(" "), {
        message: "Email must not contain spaces",
      }),

    password: z
      .string()
      .regex(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$"), {
        message:
          "Password must be at least 8 characters and contain an uppercase letter, lowercase letter, and number",
      })
      .refine((val) => !val.includes(" "), {
        message: "Password must not contain spaces",
      }),

    confirmPassword: z.string(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const SigninSchema = z.object({
  email: z
    .string()
    .email()
    .refine((value) => !value.includes(" "), {
      message: "Email must not contain spaces",
    }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .refine((val) => !val.includes(" "), {
      message: "Password must not contain spaces",
    }),
});
